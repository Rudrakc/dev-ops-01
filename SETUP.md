# Setup Guide

## Quick Start Checklist

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure GitHub Secrets

Before running the CI/CD pipelines, you need to set up GitHub Secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   - **DOCKERHUB_USERNAME**: Your DockerHub username
   - **DOCKERHUB_TOKEN**: Your DockerHub access token (create at https://hub.docker.com/settings/security)

### 3. Update Kubernetes Deployment

Edit `k8s/deployment.yaml` and replace `YOUR_DOCKERHUB_USERNAME` with your actual DockerHub username:

```yaml
image: YOUR_DOCKERHUB_USERNAME/devops-todo-api:latest
```

Change to:
```yaml
image: yourusername/devops-todo-api:latest
```

### 4. Test Locally

```bash
# Run in development mode
npm run dev

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

### 5. Test Docker Build

```bash
# Build Docker image
docker build -t devops-todo-api:latest .

# Run container
docker run -p 3000:3000 devops-todo-api:latest

# Test in another terminal
curl http://localhost:3000/api/health
```

### 6. Push to GitHub

```bash
git add .
git commit -m "Initial commit: Complete CI/CD project"
git push origin main
```

### 7. Verify CI/CD Pipeline

1. Go to your GitHub repository
2. Click on **Actions** tab
3. You should see the CI Pipeline running
4. After CI completes successfully, the CD Pipeline will automatically trigger

## Troubleshooting

### npm install fails
- Make sure you have Node.js 18+ installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Docker build fails
- Make sure Docker is running: `docker ps`
- Check Dockerfile syntax

### GitHub Actions fails
- Verify GitHub Secrets are set correctly
- Check that DockerHub username and token are valid
- Ensure `k8s/deployment.yaml` has correct image name

### Tests fail
- Run tests locally first: `npm test`
- Check test files in `tests/` directory

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure GitHub Secrets
3. ✅ Update Kubernetes deployment image
4. ✅ Test locally
5. ✅ Push to GitHub
6. ✅ Monitor CI/CD pipelines
7. ✅ Review security scan results in GitHub Security tab
