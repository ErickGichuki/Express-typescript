pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    environment {
        DATABASE_URL = credentials('DATABASE_URL')
        PORT = credentials('PORT')                
    }

    tools {
        nodejs 'Node 20' // Ensure 'Node 20' is configured in Global Tool Configuration
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
    }

    post {
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Build or tests failed. Check the logs.'
        }
        always {
            // Cleanup workspace to ensure no leftover artifacts
            cleanWs()
        }
    }
}
