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
                dir('spring-boot-projeect') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }


        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

            stage('Test Backend') {
            steps {
                dir('spring-boot-projeect') {
                    sh './mvnw test'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_BACKEND}", '-f backend/Dockerfile backend')
                    docker.build("${DOCKER_IMAGE_FRONTEND}", '-f frontend/Dockerfile frontend')
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE_BACKEND}").push()
                        docker.image("${DOCKER_IMAGE_FRONTEND}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose -f docker-compose.yml up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
