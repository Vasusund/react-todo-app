pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS 18' // Your Node.js installation in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub..."
                git branch: 'main', url: 'https://github.com/Vasusund/react-todo-app.git'
            }
        }

        stage('Build') {
            steps {
                echo "Installing dependencies and building React app..."
                sh 'rm -rf node_modules'
                sh 'npm ci'
                sh 'npm install react-router-dom@6.17.0'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests with Jest..."
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Code Quality') {
            steps {
                echo "Running ESLint for code quality..."
                sh 'npm install -g eslint@8.0.0'
                sh 'eslint src/components/Dashboard.js src/components/Login.js src/components/TodoItem.js src/utils/auth.js'
            }
        }

        stage('Security') {
            steps {
                echo "Running npm audit for security vulnerabilities..."
                sh 'npm audit --audit-level=moderate || true'
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying React app to staging server..."
                sh '''
                scp -r build/* username@staging-server:/var/www/html/react-todo-app
                ssh username@staging-server "sudo systemctl restart nginx || true"
                '''
            }
        }
    }

    post {
        always {
            echo "Pipeline completed!"
        }
        success {
            echo "Pipeline finished successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs!"
        }
    }
}
