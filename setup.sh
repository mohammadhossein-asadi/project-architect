#!/bin/bash

# Create directory structure
mkdir -p src/{templates/{frontend,backend},utils,plugins,customization,monitoring,testing,docs}

# Create frontend template directories
mkdir -p src/templates/frontend/{react,vue,angular,svelte,next}

# Create backend template directories
mkdir -p src/templates/backend/{express,nest,django,flask,fastapi,laravel}

# Create utility directories
mkdir -p src/utils/{error-handling,logging}

# Create testing directories
mkdir -p src/testing/e2e/cypress/{support,integration}

# Function to create a file with content
create_file() {
    echo "Creating $1"
    mkdir -p $(dirname "$1")
    cat > "$1"
}

# Create main configuration files
create_file "package.json" << 'EOF'
{
  "name": "project-architect",
  "version": "1.0.0",
  "description": "A powerful CLI tool for scaffolding modern web applications",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "test": "jest",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  }
}
EOF

create_file "tsconfig.json" << 'EOF'
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
EOF

# Add all files to git
git init
git add .
git commit -m "Initial project setup"