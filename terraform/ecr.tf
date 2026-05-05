locals {
  ecr_repository_url = var.manage_ecr_repository ? aws_ecr_repository.app[0].repository_url : data.aws_ecr_repository.existing[0].repository_url
}

# Terraform either manages ECR (idempotent resource) or only looks up an existing repo.
#
# If the repo already exists in AWS and you turn on manage_ecr_repository, import once:
#   terraform import 'aws_ecr_repository.app[0]' <repo-name>   # e.g. corefit-backend

resource "aws_ecr_repository" "app" {
  count = var.manage_ecr_repository ? 1 : 0

  name                 = "${var.project_name}-backend"
  image_tag_mutability = "MUTABLE"

  lifecycle {
    precondition {
      condition     = length(trimspace(var.project_name)) > 0
      error_message = "project_name must be non-empty for the ECR repository name."
    }
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
}

data "aws_ecr_repository" "existing" {
  count = var.manage_ecr_repository ? 0 : 1

  name = "${var.project_name}-backend"
}
