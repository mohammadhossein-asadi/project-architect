export const getCicdFiles = () => [
  {
    path: '.github/workflows/ci.yml',
    content: `name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x]

    steps:
    - uses: actions/checkout@v2
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: \${{ matrix.node-version }}
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test

  docker:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v1
      
    - name: Login to Docker Hub
      uses: docker/login-action@v1
      with:
        username: \${{ secrets.DOCKER_HUB_USERNAME }}
        password: \${{ secrets.DOCKER_HUB_TOKEN }}
        
    - name: Build and push
      uses: docker/build-push-action@v2
      with:
        push: true
        tags: \${{ secrets.DOCKER_HUB_USERNAME }}/app:latest`
  }
];