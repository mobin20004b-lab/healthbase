variable "REGISTRY" {
  default = "docker.io"
}

variable "REPO_NAME" {
  default = "healthbase"
}

variable "TAG" {
  default = "latest"
}

group "default" {
  targets = ["app"]
}

target "app" {
  context    = "."
  dockerfile = "Dockerfile"
  args = {
    BUILDKIT_INLINE_CACHE = "1"
  }
  cache-from = [
    "type=gha",
    "type=registry,ref=${REGISTRY}/${REPO_NAME}:buildcache"
  ]
  cache-to = [
    "type=gha,mode=max",
    "type=registry,ref=${REGISTRY}/${REPO_NAME}:buildcache,mode=max"
  ]
  platforms = ["linux/amd64", "linux/arm64"]
  tags = [
    "${REGISTRY}/${REPO_NAME}:${TAG}",
    "${REGISTRY}/${REPO_NAME}:latest"
  ]
}
