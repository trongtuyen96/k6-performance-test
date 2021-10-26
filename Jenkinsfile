pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                bat 'sudo chmod +x setup_k6.sh'
                bat 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
                bat 'k6 run tests/local.js'
            }
        }
    }
}