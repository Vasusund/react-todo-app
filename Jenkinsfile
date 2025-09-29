pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'   // Must match the NodeJS installation name in Jenkins
    }

    environment {
        APP_DIR = "${WORKSPACE}"
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
                dir("${APP_DIR}") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests with Jest...'
                dir("${APP_DIR}") {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint code quality check...'
                dir("${APP_DIR}") {
                    sh 'npx eslint src/**/*.js'
                }
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit for security vulnerabilities...'
                dir("${APP_DIR}") {
                    sh 'npm audit --audit-level=moderate'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying app to test environment...'
                dir("${APP_DIR}/build") {
                    // For simplicity, just copy to /var/www/html or another test folder
                    sh 'cp -r * /var/www/html/react-todo-app || echo "Replace with your deploy command"'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished (success or fail).'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
    }
}
