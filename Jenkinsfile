pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Vasusund/react-todo-app.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building React app...'
                sh 'npm install'
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
                sh 'npx eslint src/**/*.js src/**/*.jsx'
            }
        }

        stage('Security') {
            steps {
                echo 'Running security audit...'
                sh 'npm audit --audit-level=moderate'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying build to test environment...'
                sh 'mkdir -p /tmp/react-todo-app-deploy'
                sh 'cp -r build/* /tmp/react-todo-app-deploy/'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished (success or fail).'
        }
    }
}
