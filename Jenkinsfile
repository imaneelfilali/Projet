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
                    docker.image('maven:3.8.4-jdk-11').inside {
                        sh 'mvn package -Dmaven.test.skip -f spring-boot-projeect/pom.xml'
                    }
                    docker.build("${env.DOCKER_IMAGE_BACKEND}", 'spring-boot-projeect')
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.image('node:20').inside {
                        sh 'cd frontend/sbr-stage && npm install && CI=false npm run build'
                    }
                    docker.build("${env.DOCKER_IMAGE_FRONTEND}", 'frontend/sbr-stage')
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image("${env.DOCKER_IMAGE_BACKEND}").push()
                        docker.image("${env.DOCKER_IMAGE_FRONTEND}").push()
                        docker.image("${env.DOCKER_IMAGE_DB}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Check if port 9192 is in use and stop the container if necessary
                    def portInUse = sh(script: "docker ps --filter 'publish=9192' --format '{{.ID}}'", returnStdout: true).trim()
                    if (portInUse) {
                        sh "docker stop ${portInUse}"
                        sh "docker rm ${portInUse}"
                    }
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            deleteDir() // This ensures the workspace is cleaned after each build
        }
        failure {
            echo 'The pipeline has failed.'
        }
        success {
            echo 'The pipeline has completed successfully.'
        }
    }
}
