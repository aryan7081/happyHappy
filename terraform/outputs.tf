output "s3_bucket_id" {
  value       = aws_s3_bucket.artifacts.id
  description = "S3 artifacts bucket (versioning + encryption + public access blocked)"
}

output "ecr_repository_url" {
  value       = data.aws_ecr_repository.app.repository_url
  description = "Push Docker images here"
}

output "ecs_cluster_name" {
  value       = aws_ecs_cluster.main.name
  description = "ECS cluster name"
}

output "ecs_service_name" {
  value       = aws_ecs_service.app.name
  description = "ECS service name"
}

output "ecs_public_note" {
  value       = "After deploy: get task public IP from ECS → Tasks, then open http://TASK_IP:8000/api/"
  description = "How to verify the service"
}
