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

        stage('Setup Database') {
            steps {
                script {
                    // Start the database service
                    sh 'docker-compose up -d db'
                    // Wait for the database to be ready, if necessary
                    sh '''
                    while ! docker-compose exec db mysqladmin ping -h "127.0.0.1" --silent; do
                        echo "Waiting for database connection..."
                        sleep 2
                    done
                    '''
                    // Optionally run initial SQL commands if needed
                    sh 'docker-compose exec db mysql -u root -pmysql -e "CREATE DATABASE IF NOT EXISTS my_database;"'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('spring-boot-projeect') {
                    sh './mvnw clean package -DskipTests'
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

        stage('Build Frontend') {
            steps {
                dir('frontend/sbr-stage') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir('frontend/sbr-stage') {
                    sh 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_BACKEND}", '-f spring-boot-projeect/Dockerfile spring-boot-projeect')
                    docker.build("${DOCKER_IMAGE_FRONTEND}", '-f frontend/sbr-stage/Dockerfile frontend/sbr-stage')
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
                sh 'docker-compose up -d'
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
