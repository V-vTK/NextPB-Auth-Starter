pipeline {
    agent any

    environment {
        deployment = "CI/CD-docker"
    }

    stages {
        stage('Build and display environment') {
            steps {
                script {
                    try {
                        sh 'docker --version'
                        writeFile file: 'frontend/.env.local', text: '''
                        NEXT_BACKEND_API_URL=http://pocketbase:8090
                        '''
                        sh 'ls -a'
                        sh 'cat frontend/.env.local'
                    } catch (Exception e) {
                        echo "Error occurred while creating the environment: ${e.getMessage()}"
                        echo "Failed to display the environment"
                    }
                }
            }
        }

        stage('Build and Run') {
            steps {
                script {
                    try {
                        sh 'docker compose up -d --build'
                    } catch (Exception e) {
                        echo "Error occurred while running docker-compose: ${e.getMessage()}"
                        error "Failed to run 'docker compose up -d --build"
                    }
                }
            }
        }

        stage('Test deployment') {
            steps {
                script {
                    echo 'Testing coming soon'
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
    }
}