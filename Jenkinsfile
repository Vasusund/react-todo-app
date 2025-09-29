pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'
    }

    environment {
        PATH = "${tool('NodeJS 18')}/bin:${env.PATH}"
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN') // Jenkins secret
        NETLIFY_SITE_ID = 'YOUR_NETLIFY_SITE_ID'               // Replace with your site ID
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/Vasusund/react-todo-app.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building React app...'
                sh 'rm -rf node_modules'
                sh 'npm ci'
                sh 'npm install react-router-dom@6.17.0'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests with Jest...'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint for code quality...'
                sh 'npm install -g eslint@8.0.0'
                sh 'eslint src/**/*.js || true'
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit for security vulnerabilities...'
                sh 'npm audit --audit-level=moderate || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying React app to Netlify...'
                sh 'npm install -g netlify-cli'
                sh """
                    netlify deploy \
                    --dir=build \
                    --prod \
                    --auth=\$NETLIFY_AUTH_TOKEN \
                    --site=\$NETLIFY_SITE_ID
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! Your app is live at Netlify.'
        }
        failure {
            echo 'Pipeline failed. Check the logs!'
        }
    }
}
