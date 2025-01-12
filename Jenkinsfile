pipeline {
    agent any

    environment {
        DATABASE_URL = credentials('DATABASE_URL')  // Pulling from Jenkins credentials
        PORT = credentials('PORT')                  // Pulling from Jenkins credentials
    }

    tools {
        nodejs 'Node 20'  // Make sure 'Node 20' is configured in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout source code from SCM
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm ci'
            }
        }

        stage('Build Project') {
            steps {
                // Build the project, if applicable
                sh 'npm run build --if-present'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests (Uncomment this stage when tests are ready)
                sh 'npm test'
            }
        }

        stage('Post Actions') {
            steps {
                // Clean workspace after build and tests
                cleanWs()
            }
        }
    }

    post {
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Build or tests failed. Check the logs.'
        }
    }
}
