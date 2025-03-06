project = "hexo-deploy"

app "hexo" {
  labels = {
    service = "hexo"
  }

  build {
    use "docker" {
      # Path to your Dockerfile; adjust if it's located elsewhere
      dockerfile = "./Dockerfile"
    }
  }

  deploy {
    use "kubernetes" {
      port = 80
      service_type = "LoadBalancer"
      container_port = 80
      replicas = 1
    }
  }

  release {
    use "rollout" {}
  }
}
