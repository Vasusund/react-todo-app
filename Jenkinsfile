pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'   // Must match the NodeJS installation name in Jenkins
    }

    environment {
        PATH = "${tool('NodeJS 18')}/bin:${env.PATH}"
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
                sh 'rm -rf node_modules'      // ensure fresh install
                sh 'npm ci'                   // clean install from package-lock.json
                sh 'npm run build'            // build React project
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
                echo 'Running code quality analysis with ESLint...'
                // Install ESLint globally (if not already installed)
                sh 'npm install -g eslint@8.0.0'
                // Run ESLint
                sh 'eslint src/**/*.js || true' // continue even if lint errors found
            }
        }

        stage('Security') {
            steps {
                echo 'Running security audit with npm...'
                sh 'npm audit --audit-level=moderate || true'  // checks for vulnerabilities
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying build folder...'
                // For now, just archive as deploy artifact
                archiveArtifacts artifacts: 'build/**', fingerprint: true
                echo 'Build archived for deployment.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs!'
        }
    }
}
