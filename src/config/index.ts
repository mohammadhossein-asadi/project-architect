export interface ProjectConfig {
  name: string;
  type: "frontend" | "backend";
  framework: string;
  language: "typescript" | "javascript";
  tooling?: "vite" | "cra";
  version: string;
  description?: string;
  author?: string;
  features: string[];
  customizations: {
    testing: boolean;
    linting: boolean;
    docker: boolean;
    ci: boolean;
  };
}

export const defaultProjectConfig: Partial<ProjectConfig> = {
  version: "0.1.0",
  customizations: {
    testing: false,
    linting: true,
    docker: false,
    ci: false,
  },
};

export const frameworkConfigs = {
  react: {
    vite: {
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
      devDependencies: {
        "@vitejs/plugin-react": "^4.2.0",
        vite: "^5.0.0",
      },
    },
    cra: {
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "react-scripts": "5.0.1",
        "web-vitals": "^2.1.4",
      },
      devDependencies: {},
    },
  },
};

export const typescriptDevDependencies = {
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  typescript: "^5.0.0",
};

export const testingDependencies = {
  dependencies: {},
  devDependencies: {
    vitest: "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
  },
};

export const lintingDependencies = {
  dependencies: {},
  devDependencies: {
    eslint: "^8.0.0",
    "eslint-plugin-react": "^7.0.0",
    "eslint-plugin-react-hooks": "^4.0.0",
    prettier: "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
  },
};

export const dockerConfigs = {
  dockerfile: `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]`,

  dockerignore: `node_modules
npm-debug.log
build
dist
.git
.gitignore`,
};

export const ciConfig = `name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Test
      if: \${{ contains(fromJson('[\"testing\"]'), 'testing') }}
      run: npm test
`;

export function generateReadme(config: ProjectConfig): string {
  return `# ${config.name}

A modern ${config.framework} project created with Project Architect.

## Technology Stack

- Framework: ${config.framework}
- Language: ${config.language}
- Build Tool: ${config.tooling}

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)

### Installation

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## Features

${config.features.map((feature) => `- ${feature}`).join("\n")}

## Project Structure

\`\`\`
${config.name}/
├── src/
│   ├── components/    # React components
│   ├── assets/       # Static assets
│   ├── styles/       # CSS styles
│   ├── App.${config.language === "typescript" ? "tsx" : "jsx"}
│   └── main.${config.language === "typescript" ? "tsx" : "jsx"}
├── index.html
├── package.json
${
  config.language === "typescript"
    ? "├── tsconfig.json\n├── tsconfig.node.json"
    : ""
}
${config.tooling === "vite" ? "├── vite.config.ts" : ""}
└── .gitignore
\`\`\`

## Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build for production
- \`npm run preview\`: Preview production build
${config.customizations.testing ? "- `npm test`: Run tests" : ""}
${
  config.customizations.linting
    ? "- `npm run lint`: Run ESLint\n- `npm run format`: Format code with Prettier"
    : ""
}

## Additional Configuration

${
  config.customizations.linting
    ? "- ESLint and Prettier configured for code quality\n"
    : ""
}${
    config.customizations.testing
      ? "- Testing setup with Vitest and React Testing Library\n"
      : ""
  }${config.customizations.docker ? "- Docker configuration included\n" : ""}${
    config.customizations.ci ? "- GitHub Actions CI/CD pipeline configured" : ""
  }

## License

MIT

---
Generated with ❤️ by Project Architect
Created: ${new Date().toISOString().replace("T", " ").slice(0, 19)}
`;
}

export function getCurrentDateTime(): string {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

export function getCurrentUser(): string {
  return process.env.USER || process.env.USERNAME || "unknown";
}
