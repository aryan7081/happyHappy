#!/usr/bin/env bash
# Import already-created AWS resources into Terraform state so `apply` does not fail with
# "already exists" when state was empty (e.g. first CI run, or no remote backend yet).
# Safe to run every time: skips addresses already in state.
set -u

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR/terraform"

PROJECT="${TF_VAR_project_name:-corefit}"
MANAGE_ECR="${TF_VAR_manage_ecr_repository:-false}"

import_if_absent() {
  local addr="$1"
  local id="$2"
  if terraform state show "$addr" >/dev/null 2>&1; then
    echo "adopt: skip (already in state) $addr"
    return 0
  fi
  echo "adopt: importing $addr <- $id"
  if terraform import "$addr" "$id"; then
    return 0
  fi
  echo "adopt: warning — import failed for $addr (resource may not exist yet or id mismatch). Continuing."
  return 0
}

# ECR (only when Terraform manages the repo)
if [ "$MANAGE_ECR" = "true" ]; then
  import_if_absent 'aws_ecr_repository.app[0]' "${PROJECT}-backend"
fi

import_if_absent aws_cloudwatch_log_group.app "/ecs/${PROJECT}"

import_if_absent aws_ecs_cluster.main "${PROJECT}-cluster"

CLUSTER="${PROJECT}-cluster"
SERVICE="${PROJECT}-service"
FAMILY="${PROJECT}-task"

if aws ecs describe-services --cluster "$CLUSTER" --services "$SERVICE" --query 'services[0].status' --output text 2>/dev/null | grep -Eq 'ACTIVE|DRAINING'; then
  SG_ID=$(aws ecs describe-services \
    --cluster "$CLUSTER" \
    --services "$SERVICE" \
    --query 'services[0].networkConfiguration.awsvpcConfiguration.securityGroups[0]' \
    --output text 2>/dev/null || true)
  if [ -n "$SG_ID" ] && [ "$SG_ID" != "None" ]; then
    import_if_absent aws_security_group.ecs_service "$SG_ID"
  fi

  TD_ARN=$(aws ecs describe-services \
    --cluster "$CLUSTER" \
    --services "$SERVICE" \
    --query 'services[0].taskDefinition' \
    --output text 2>/dev/null || true)
  if [ -n "$TD_ARN" ] && [ "$TD_ARN" != "None" ]; then
    import_if_absent aws_ecs_task_definition.app "$TD_ARN"
  fi

  import_if_absent aws_ecs_service.app "${CLUSTER}/${SERVICE}"
fi

# Standalone resources (cluster exists but no service yet — try latest task revision)
if ! terraform state show aws_ecs_task_definition.app >/dev/null 2>&1; then
  TD_ARN=$(aws ecs list-task-definitions \
    --family-prefix "$FAMILY" \
    --sort DESC \
    --max-items 1 \
    --query 'taskDefinitionArns[0]' \
    --output text 2>/dev/null || true)
  if [ -n "$TD_ARN" ] && [ "$TD_ARN" != "None" ]; then
    import_if_absent aws_ecs_task_definition.app "$TD_ARN"
  fi
fi

echo "adopt: done"
