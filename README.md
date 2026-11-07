# CloudOps Enterprise Platform

Cloud capstone project: cloud infrastructure, automation and a deployment ecosystem built with AWS, Terraform, Docker, Kubernetes and GitHub Actions.

**Full report:** [CloudOps_Enterprise_Platform_Architecture_DocumenT.pdf](CloudOps_Enterprise_Platform_Architecture_DocumenT.pdf)

## What this project does

- Builds AWS infrastructure with Terraform (VPC, subnets, EC2 web server, S3 with lifecycle rule, RDS MySQL, IAM role, CloudWatch monitoring).
- Runs microservices (frontend, backend, cicd-app) on a local Kubernetes cluster (kind).
- Builds, tests and publishes the Docker image automatically with a GitHub Actions pipeline.
- Serves a serverless API with AWS Lambda and API Gateway.
- Provides a no-code app on Google AppSheet connected to Google Sheets.

## Tech stack

| Area | Tools |
|---|---|
| Cloud | AWS (ap-south-1, Mumbai) |
| Infrastructure as Code | Terraform |
| Containers | Docker, Kubernetes (kind) |
| CI/CD | GitHub Actions, GitHub Container Registry (GHCR) |
| Serverless | AWS Lambda, API Gateway |
| Monitoring | CloudWatch dashboard, alarm, SNS email |
| No-code | Google AppSheet, Google Sheets |

## Repository structure

| Path | Purpose |
|---|---|
| `main.tf` | VPC, subnets, security groups, EC2, S3, RDS, IAM |
| `monitoring.tf` | CloudWatch dashboard, CPU alarm |
| `k8s-services.yaml` | Frontend and backend Kubernetes deployments and services |
| `k8s-app.yaml` | cicd-app deployment and service |
| `app/` | Application source, Dockerfile and unit test |
| `.github/workflows/ci-cd.yml` | CI/CD pipeline (test, build and push, deploy check) |
| `*.png` | Project screenshots (listed below) |

## How to run

```
terraform init
terraform apply
kubectl apply -f k8s-services.yaml
kubectl apply -f k8s-app.yaml
kubectl get pods
```

Cleanup (to avoid AWS charges):

```
terraform destroy
```

All AWS resources were destroyed after the screenshots were captured (27 resources destroyed).

## Screenshots

### Module 1: Infrastructure provisioning and virtualization

**Terraform apply outputs** (web URL, Docker URL, instance ID, RDS endpoint, S3 bucket)

![Terraform apply outputs](Screenshot%202026-11-06%20223723.png)

**Docker nginx on port 8080**

![Docker nginx](Screenshot%202026-11-06%20223925.png)

**EC2 instance running (t3.micro, 3/3 status checks passed)**

![EC2 running](Screenshot%202026-11-06%20224124.png)

**nginx service status and docker ps on the EC2 instance**

![nginx status and docker ps](Screenshot%202026-11-06%20225727.png)

### Module 2: Networking, storage and data

**VPC (cloudops-vpc)**

![VPC](Screenshot%202026-11-06%20224153.png)

**Subnets**

![Subnets](Screenshot%202026-11-06%20225855.png)

**S3 lifecycle rule (archive-old-data)**

![S3 lifecycle rule](Screenshot%202026-11-06%20224333.png)

**S3 default encryption (SSE-S3)**

![S3 encryption](Screenshot%202026-11-06%20224459.png)

**RDS MySQL available (cloudops-mysql)**

![RDS available](Screenshot%202026-11-06%20224617.png)

**RDS configuration, storage encryption enabled**

![RDS encryption](Screenshot%202026-11-06%20224738.png)

### Module 3: Serverless and microservices

**Lambda function code**

![Lambda code](Screenshot%202026-11-06%20231217.png)

**API Gateway GET /hello route**

![API Gateway route](Screenshot%202026-11-06%20232008.png)

**API route details**

![Route details](Screenshot%202026-11-06%20232658.png)

**/hello JSON output in the browser**

![Hello JSON output](Screenshot%202026-11-06%20232237.png)

**kind cluster, kubectl apply and services**

![kind cluster](Screenshot%202026-11-07%20005751.png)

**All pods running**

![Pods running](Screenshot%202026-11-07%20010607.png)

**Frontend service (localhost:8081)**

![Frontend](Screenshot%202026-11-07%20005933.png)

**Backend service (localhost:8082)**

![Backend](Screenshot%202026-11-07%20010405.png)

**cicd-app pods running (image built by the pipeline)**

![cicd-app pods](Screenshot%202026-11-07%20015654.png)

### Module 4: Security, IAM and monitoring

**IAM role cloudops-ec2-role**

![IAM role](Screenshot%202026-11-06%20224945.png)

**CloudWatch dashboard**

![CloudWatch dashboard](Screenshot%202026-11-06%20235227.png)

**CloudWatch alarm**

![CloudWatch alarm](Screenshot%202026-11-06%20233606.png)

**SNS email subscription for alerts**

![SNS subscription](Screenshot%202026-11-06%20235423.png)

### Modules 5 and 6: IaC and CI/CD

**GitHub Actions run**

![GitHub Actions](Screenshot%202026-11-07%20015005.png)

**Commit with 3/3 checks passed**

![Checks passed](Screenshot%202026-11-07%20015108.png)

### Module 8: No-code app

**Mendix signup error** (free signup allows only work email, so AppSheet was used instead)

![Mendix error](Screenshot%202026-11-07%20020745.png)

**AppSheet app (CloudOpsData)**

![AppSheet app](Screenshot%202026-11-07%20021530.png)

**AppSheet deployment check** (production deployment needs a paid plan, the app runs in prototype mode)

![AppSheet deployment check](Screenshot%202026-11-07%20022025.png)

**AppSheet apps list**

![AppSheet apps list](Screenshot%202026-11-07%20022151.png)

## Notes

- Kinesis, EMR, Redshift and SageMaker are covered as an architecture and summary in the report, not deployed (AWS free plan limits and cost).
- Kubernetes runs locally on kind instead of EKS to avoid cost.
