// pipeline {
//     agent any

//     environment {
//         DATABASE_URL = credentials('DATABASE_URL')
//         PORT = credentials('PORT')
//     }

//     tools {
//         nodejs 'Node 20'
//     }

//     stages {
//         stage('Checkout Code') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm ci'
//             }
//         }

//         stage('Build Project') {
//             steps {
//                 sh 'npm run build --if-present'
//             }
//         }

//         // Uncomment this stage to include tests
//         // stage('Run Tests') {
//         //     steps {
//         //         sh 'npm test'
//         //     }
//         // }
//     }
// }
