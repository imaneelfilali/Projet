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
    stage('Docker Push') {
        steps {
            script {
                docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB') {
                    sh "docker push ${DOCKER_IMAGE_BACKEND}"
                    sh "docker push ${DOCKER_IMAGE_FRONTEND}"
                }
            }
        }
    }


        stage('Setup Database') {
            steps {
                script {
                    // Start the database service
                    sh 'docker-compose up -d db'

                    // Wait for the database to be ready
                    sh '''
                    while ! docker-compose exec db mysqladmin ping -h "127.0.0.1" --silent; do
                        echo "Waiting for database connection..."
                        sleep 2
                    done
                    '''

                    // Optional: Run any initial SQL commands if needed
                    sh 'docker-compose exec db mysql -u root -pmysql -e "CREATE DATABASE IF NOT EXISTS my_database;"'
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    // Build the backend Docker image
                    sh 'docker-compose build backend'
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    // Run backend tests
                    sh 'docker-compose run backend ./gradlew test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    // Build the frontend Docker image
                    sh 'docker-compose build frontend'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                script {
                    // Run frontend tests
                    sh 'docker-compose run frontend npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Build all services
                    sh 'docker-compose build'
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    // Push backend and frontend images to Docker Hub
                    sh "docker login -u <your-docker-username> -p <your-docker-password>"
                    sh "docker push ${DOCKER_IMAGE_BACKEND}"
                    sh "docker push ${DOCKER_IMAGE_FRONTEND}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy the application
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            // Clean up resources
            sh 'docker-compose down'
        }
    }
}
