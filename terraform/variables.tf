variable "aws_region" {
  type        = string
  description = "AWS region (e.g. ap-south-1)"
  default     = "ap-south-1"
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

# Shared IAM role for ECS task execution + task (per project policy)
variable "ecs_shared_iam_role_arn" {
  type        = string
  description = "IAM role ARN used for both execution_role and task_role on the ECS task definition"
  default     = "arn:aws:iam::312408089469:role/aws-service-role/ecs.amazonaws.com/AWSServiceRoleForECS"
}
