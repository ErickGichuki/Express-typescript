pipeline {
    agent any

    environment {
        DATABASE_URL = credentials('DATABASE_URL')
        PORT = credentials('PORT')                
    }

    tools {
        nodejs 'Node 20' 
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
                cleanWs()
            }
        }
    }

    post {
        success {
            echo 'Build, tests and deployment succeeded!'
        }
        failure {
            echo 'Something went wrong. Check the logs.'
        }
    }
}


