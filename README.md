# DevOps CI/CD Project - Todo API

A simple TypeScript/Express.js REST API with a complete CI/CD pipeline demonstrating DevOps best practices including security scanning, containerization, and Kubernetes deployment.

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Docker Usage](#docker-usage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Kubernetes Deployment](#kubernetes-deployment)
- [API Documentation](#api-documentation)
- [GitHub Secrets Configuration](#github-secrets-configuration)

## 🎯 Overview

This project implements a Todo List REST API using TypeScript and Express.js, with a complete CI/CD pipeline that includes:

- **Code Quality**: ESLint for linting
- **Security**: CodeQL (SAST), npm audit (SCA), Trivy (container scanning), DAST
- **Testing**: Jest unit tests
- **Containerization**: Multi-stage Docker build
- **Deployment**: Kubernetes deployment using Kind (free, runs in GitHub Actions)

## 🛠 Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Testing**: Jest
- **Linting**: ESLint
- **Container**: Docker
- **Orchestration**: Kubernetes (Kind)
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
project-root/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI pipeline
│       └── cd.yml          # CD pipeline
├── src/
│   ├── index.ts            # Application entry point
│   ├── routes/
│   │   └── api.ts          # API routes
│   ├── controllers/
│   │   └── todoController.ts
│   ├── services/
│   │   └── todoService.ts
│   └── models/
│       └── todo.ts
├── tests/
│   ├── todoService.test.ts
│   └── todoController.test.ts
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── Dockerfile
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 🚀 Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devops-ci-cd-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Run the compiled application**
   ```bash
   npm start
   ```

6. **Run tests**
   ```bash
   npm test
   ```

7. **Run linting**
   ```bash
   npm run lint
   ```

The API will be available at `http://localhost:3000`

## 🐳 Docker Usage

### Build Docker Image

```bash
docker build -t devops-todo-api:latest .
```

### Run Docker Container

```bash
docker run -p 3000:3000 devops-todo-api:latest
```

### Test Container

```bash
curl http://localhost:3000/api/health
```

## 🔄 CI/CD Pipeline

### CI Pipeline Stages

The CI pipeline (`.github/workflows/ci.yml`) includes:

1. **Checkout**: Retrieve source code
2. **Setup Runtime**: Install Node.js 18
3. **Linting**: Run ESLint to enforce coding standards
4. **SAST**: CodeQL analysis for security vulnerabilities
5. **SCA**: npm audit for dependency vulnerabilities
6. **Unit Tests**: Run Jest tests with coverage
7. **Build**: Compile TypeScript to JavaScript
8. **Docker Build**: Create container image
9. **Image Scan**: Trivy vulnerability scanning
10. **Runtime Test**: Validate container functionality
11. **Registry Push**: Push image to DockerHub

### CD Pipeline Stages

The CD pipeline (`.github/workflows/cd.yml`) includes:

1. **Trigger**: Runs after successful CI completion
2. **Setup Kind**: Create Kubernetes cluster in GitHub Actions
3. **Deploy**: Deploy application to Kubernetes
4. **DAST**: Dynamic Application Security Testing
5. **Health Check**: Verify deployment health

### Pipeline Triggers

- Push to `master` or `main` branch
- Pull requests to `master` or `main`
- Manual trigger via `workflow_dispatch`

## ☸️ Kubernetes Deployment

This project uses **Kind (Kubernetes in Docker)** for free Kubernetes deployment in GitHub Actions.

### Why Kind?

- ✅ 100% Free - No cloud account or credit card required
- ✅ Runs in GitHub Actions - No external infrastructure needed
- ✅ Full Kubernetes API - Complete K8s functionality
- ✅ Perfect for CI/CD - Ephemeral clusters for each run

### Local Kubernetes Testing (Optional)

If you want to test Kubernetes locally:

1. **Install Kind**
   ```bash
   curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
   chmod +x ./kind
   sudo mv ./kind /usr/local/bin/kind
   ```

2. **Create cluster**
   ```bash
   kind create cluster --name devops-project
   ```

3. **Load Docker image**
   ```bash
   kind load docker-image devops-todo-api:latest --name devops-project
   ```

4. **Deploy**
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

5. **Port forward and test**
   ```bash
   kubectl port-forward svc/devops-todo-api-service 3000:3000
   curl http://localhost:3000/api/health
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "API is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get All Todos
```http
GET /api/todos
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Todo Title",
      "description": "Todo Description",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Get Todo by ID
```http
GET /api/todos/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Todo Title",
    "description": "Todo Description",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "New Todo",
  "description": "Todo description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "New Todo",
    "description": "Todo description",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Todo created successfully"
}
```

#### Toggle Todo Status
```http
PATCH /api/todos/:id/toggle
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Todo Title",
    "description": "Todo Description",
    "completed": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Todo status updated successfully"
}
```

#### Delete Todo
```http
DELETE /api/todos/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

## 🔐 GitHub Secrets Configuration

To run the CI/CD pipelines, you need to configure the following GitHub Secrets:

### Required Secrets

1. **DOCKERHUB_USERNAME**
   - Your DockerHub username
   - Settings → Secrets and variables → Actions → New repository secret

2. **DOCKERHUB_TOKEN**
   - Your DockerHub access token (not password)
   - Create at: https://hub.docker.com/settings/security
   - Settings → Secrets and variables → Actions → New repository secret

### How to Set Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact names above

### Update Kubernetes Deployment

Before deploying, update `k8s/deployment.yaml`:

```yaml
image: YOUR_DOCKERHUB_USERNAME/devops-todo-api:latest
```

Replace `YOUR_DOCKERHUB_USERNAME` with your actual DockerHub username.

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:ci
```

### Run Linting
```bash
npm run lint
```

## 📊 CI/CD Pipeline Explanation

### Why Each Stage Exists

1. **Linting**: Prevents technical debt, ensures code consistency
2. **SAST (CodeQL)**: Detects code-level security vulnerabilities (OWASP Top 10)
3. **SCA (npm audit)**: Identifies vulnerable dependencies in package.json
4. **Unit Tests**: Prevents regressions, validates business logic
5. **Build**: Compiles TypeScript, validates types, creates deployable artifact
6. **Docker Build**: Packages application for consistent deployment
7. **Image Scan (Trivy)**: Prevents shipping containers with known vulnerabilities
8. **Runtime Test**: Ensures container starts and responds correctly
9. **Registry Push**: Enables downstream CD pipeline
10. **Kubernetes Deployment**: Demonstrates production-like deployment
11. **DAST**: Tests running application for runtime security issues

## 📝 License

MIT

## 👤 Author

DevOps CI/CD Project for SST
