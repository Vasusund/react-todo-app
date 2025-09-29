pipeline {
    agent any

    tools {
        nodejs 'NodeJS'   // Must match the NodeJS installation name in Jenkins
    }

    environment {
        PROJECT_DIR = "${WORKSPACE}"  // project workspace
        BUILD_DIR = "${WORKSPACE}/build"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out Git repository...'
                git branch: 'main', url: 'https://github.com/Vasusund/react-todo-app.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building React app...'
                sh 'npm install'
                sh 'npm run build'   // Generates the build folder
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Checking code quality with ESLint...'
                sh 'npx eslint src/**/*.js'
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit for security vulnerabilities...'
                sh 'npm audit --audit-level=moderate || true'
                // Using || true so that the pipeline does not fail on vulnerabilities
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying app to test environment...'
                sh '''
                    mkdir -p /tmp/react-todo-test
                    cp -r build/* /tmp/react-todo-test/
                '''
                echo 'Deployment done. You can open /tmp/react-todo-test/index.html to view the app.'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished (success or fail).'
        }
    }
}
