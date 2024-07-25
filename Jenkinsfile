pipeline {
    agent any
    stages {
        stage('Test Docker') {
            steps {
                bat 'docker --version'
                bat 'docker run hello-world'
            }
        }
    }
}
