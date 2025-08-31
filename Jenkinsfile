pipeline {
    agent any

    environment {
        deployment = "CI/CD-docker"
        // Add Jenkins Credentials
        // SECRET_API_KEY = credentials('c6ac2bae-6e11-4542-8a65-eec34d21e967')
    }

    stages {
        stage('Build and display environment') {
            steps {
                script {
                    try {
                        sh 'docker --version'
                        // Change to use the Docker DNS resolver
                        writeFile file: 'frontend/.env.local', text: '''
                        NEXT_BACKEND_API_URL=http://next-pocketbase:8090
                        '''

                        // Create the environment directory and move files. DinD quirks, overrides the stack otherwise
                        sh '''
                            bash -l -c  '
                              rm -rf NextPB-Auth-Starter
                              mkdir -p NextPB-Auth-Starter
                              shopt -s extglob
                              mv -- !(NextPB-Auth-Starter) NextPB-Auth-Starter/
                            '
                        '''
                        // Verify the environment
                        sh 'ls -a'
                        sh 'cat NextPB-Auth-Starter/frontend/.env.local'
                        sh '''
                            cd NextPB-Auth-Starter
                            ls -a
                        '''

                        // Inject additional environment variables
                        sh """
                            cd NextPB-Auth-Starter/frontend
                            # echo 'NEXT_SECRET_API_KEY="${SECRET_API_KEY}"' >> .env
                        """
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
                        // Launch frontend services and pocketbase with injected hooks (by service name not container name)
                        sh '''
                            cd NextPB-Auth-Starter
                            docker compose up -d --build pocketbase frontend
                            echo "Copying newest hooks to volume..."
                            docker cp pocketbase/pb_hooks/. $(docker compose ps -q pocketbase):/pb_hooks/
                        '''
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
                    // Launch the test automation service and reference the container name
                    sh '''
                        cd NextPB-Auth-Starter
                        docker compose up --build --exit-code-from test-automation test-automation
                        docker ps
                        docker logs next-test-automation
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check logs for details.'
            sh '''
                cd NextPB-Auth-Starter
                docker compose down
            '''
        }

        aborted {
            echo 'Pipeline was aborted. Cleaning up and closing resources...'
            sh '''
                cd NextPB-Auth-Starter
                docker compose down
            '''
        }

        success {
            echo 'Pipeline completed successfully. The new deployment is now running...'
        }
    }
}