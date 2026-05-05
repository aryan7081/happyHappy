variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Prefix for resource names"
  default     = "corefit"
}

variable "django_secret_key" {
  type        = string
  description = "Django SECRET_KEY for ECS task (use a strong value in prod)"
  default     = "change-me-set-via-tfvars-or-env"
  sensitive   = true
}

variable "manage_ecr_repository" {
  type        = bool
  description = "If true, Terraform creates the ECR repo. If the repo already exists, import: terraform import 'aws_ecr_repository.app[0]' <repo-name>."
  default     = true
}
