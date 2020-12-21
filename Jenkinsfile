pipeline {
  environment {
        registry = "https://harbor.cloudcontrolsystems.cn/ccs/"
  }
  agent any
  stages {
        stage('Cloning Git') {
            steps {
                git branch: 'release', url: 'gitea@git.cloudcontrolsystems.cn:CloudTeam/Frontend.git'
            }
        }
        stage('Building image') {
            steps{
                    script {
                        customImage = docker.build("harbor.cloudcontrolsystems.cn/workflow/ccs-frontend:latest")
                    }
            }
        }
        stage('Deploy') {
            steps{
                    script {
                        docker.withRegistry(registry, '64df7683-d0de-4cb1-b121-da9dd8b2198e') {
                            customImage.push()
                        }
                    }
            }
        }
    }
}