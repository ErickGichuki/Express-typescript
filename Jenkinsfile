pipeline {
    agent any
    // {
    //     docker {
    //         image 'node:20'
    //     }
    // }

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
        stage('Deploy'){
            steps {
                script {
                    def remoteUser = ''
                    def remoteHost = ''
                    def privateKey = ''
                    def targetDirectory = ''

                    sh """
                    scp -i ${privateKey} -r * ${remoteUser}@${remoteHost}:${targetDirectory}
                    ssh -i ${privateKey} ${remoteUser}@${remoteHost} <<EOF
                    cd ${targetDirectory}
                    npm install --production
                    pm2 restart app || pm2 start server.js
                    EOF
                    """
                }
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
