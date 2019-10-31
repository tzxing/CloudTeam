pipeline {
  environment {
        registry = "https://harbor.cloudcontrolsystems.cn/ccs/"
  }
  agent any
  stages {
        stage('Cloning Git') {
            steps {
                git branch: 'release', url: 'gitea@git.cloudcontrolsystems.cn:cloud-control-systems-developers/ccs-frontend.git'
            }
        }
        stage('Building image') {
            steps{
                    script {
                        customImage = docker.build(registry + "ccs-frontend:$BUILD_NUMBER")
                    }
            }
        }
        stage('Deploy') {
            steps{
                    script {
                        docker.withRegistry(registry, 'a4350053-a94a-4240-a4cf-bb687e470647') {
                            customImage.push()
                        }
                    }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}