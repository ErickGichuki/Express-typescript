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
        stage('Deploy') {
    steps {
        script {
            def remoteUser = 'ubuntu'
            def remoteHost = '34.221.197.220'
            def privateKey = '/home/erick/Downloads/ci.pem'  // Full path to the private key
            def targetDirectory = 'deployment'

            // Ensure .ssh directory exists and has the correct permissions
            sh """
                mkdir -p /var/lib/jenkins/.ssh
                chmod 700 /var/lib/jenkins/.ssh
                ssh-keyscan -H ${remoteHost} >> /var/lib/jenkins/.ssh/known_hosts
                chmod 644 /var/lib/jenkins/.ssh/known_hosts
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
