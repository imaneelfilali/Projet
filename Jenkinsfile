pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'elfilaliimane02273/pfa-ci-cd-backend:v1.0'
        DOCKER_IMAGE_FRONTEND = 'elfilaliimane02273/pfa-ci-cd-frontend:v1.0'
        DOCKER_IMAGE_DB = 'elfilaliimane02273/mysql:v1.0'
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                  url: 'https://github.com/imaneelfilali/Projet.git',
                  branch: 'main',
                  credentialsId: 'd5ea2663-5a36-4414-be6d-7177fe9238f2'
                )
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    docker.image('maven:3.9.8-jdk-17').inside {
                        sh 'mvn clean package -f backend/pom.xml'
                    }
                    docker.build("${env.DOCKER_IMAGE_BACKEND}", 'backend')
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
