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
                git branch: 'main', url: 'https://github.com/imaneelfilali/Projet.git'
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE_BACKEND).inside {
                        sh 'cd spring-boot-projeect && ./mvnw clean package'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE_FRONTEND).inside {
                        sh 'cd frontend/sbr-stage && npm install && npm run build'
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    sh 'docker-compose up -d backend'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    sh 'docker-compose up -d frontend'
                }
            }
        }

        stage('Deploy Database') {
            steps {
                script {
                    sh 'docker-compose up -d db'
                }
            }
        }

        stage('Integration Test') {
            steps {
                script {
                    // Add your integration tests here
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose down'
        }
    }
}
