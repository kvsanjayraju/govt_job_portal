# Infrastructure Deployment Guide

This repository is designed to be deployed as a containerized application. Below are the guides for AWS and Azure.

## Prerequisites
- Docker installed locally for building images.
- AWS CLI or Azure CLI configured.
- A container registry (ECR or ACR).

## AWS Deployment Path

### 1. Database (RDS)
- Create a PostgreSQL instance in Amazon RDS.
- Ensure the security group allows inbound traffic from your backend service (ECS/Fargate).
- Store the connection string `DATABASE_URL` in AWS Secrets Manager or Parameter Store.

### 2. Backend (ECS Fargate)
- Build the backend Docker image: `docker build -t careernebula-backend ./backend`.
- Push to ECR.
- Create an ECS Task Definition using Fargate launch type.
- Add environment variables (DB URL, Secrets) to the task definition.
- Create a Service and expose it via an Application Load Balancer (ALB).

### 3. Frontend (S3 + CloudFront OR Amplify)
- **Option A (Static):** Run `npm run build` locally. The output in `.next` (or `out` if using static export) can be synced to an S3 bucket. Use CloudFront for global distribution.
- **Option B (Container):** Deploy the frontend container to ECS/App Runner similarly to the backend. This is required if using SSR features of Next.js.
- **Option C (Amplify):** Connect the repo to AWS Amplify for automatic CI/CD and hosting.

## Azure Deployment Path

### 1. Database (Azure Database for PostgreSQL)
- Create a PostgreSQL Flexible Server.
- Allow access from Azure services.

### 2. Backend (Azure App Service for Containers)
- Build and push the backend image to Azure Container Registry (ACR).
- Create a Web App for Containers.
- Set environment variables in "Configuration" -> "Application settings".

### 3. Frontend (Azure Static Web Apps)
- Connect your GitHub repo to Azure Static Web Apps.
- Configure the build settings to point to `/frontend`.
- For SSR support, consider deploying as a container to Azure App Service or Azure Container Apps.

## Security Notes
- Never commit `.env` files.
- Use IAM roles (AWS) or Managed Identities (Azure) where possible.
- In production, ensure `DATABASE_URL` uses SSL.
