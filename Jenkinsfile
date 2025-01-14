pipeline {
    agent any
    // {
    //     docker {
    //         image 'node:20'
    //     }
    // }

    environment {
        DATABASE_URL = 'postgresql://neondb_owner:ojRcupeC2BE8@ep-morning-fire-a5fv0rv8.us-east-2.aws.neon.tech/neondb?sslmode=require'
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

// pipeline {
//     agent any
//     stages {
//         stage('Check Docker') {
//             steps {
//                 script {
//                     sh 'docker ps'
//                 }
//             }
//         }
//     }
// }
