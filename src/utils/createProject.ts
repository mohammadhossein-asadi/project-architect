import { ProjectOptions } from '../types.js';
import { Logger } from './logging/Logger.js';
import * as fs from 'fs/promises';
import * as path from 'path';

const logger = new Logger();

export async function createProject(options: ProjectOptions): Promise<void> {
  const projectPath = path.join(process.cwd(), options.name);

  try {
    // Create project directory
    await fs.mkdir(projectPath, { recursive: true });
    logger.info(`Created project directory: ${projectPath}`);

    // Create basic project structure
    await createProjectStructure(projectPath);

    // Initialize git repository
    await initializeGit(projectPath);

    // Create configuration files
    await createConfigFiles(projectPath, options);

    logger.info(`Successfully created project: ${options.name}`);
  } catch (error) {
    logger.error('Failed to create project:', error);
    throw error;
  }
}

async function createProjectStructure(projectPath: string): Promise<void> {
  const directories = [
    'src',
    'src/components',
    'src/pages',
    'src/utils',
    'src/styles',
    'src/tests',
    'public'
  ];

  for (const dir of directories) {
    await fs.mkdir(path.join(projectPath, dir), { recursive: true });
    logger.info(`Created directory: ${dir}`);
  }
}

async function initializeGit(projectPath: string): Promise<void> {
  try {
    await fs.mkdir(path.join(projectPath, '.git'));
    await fs.writeFile(
      path.join(projectPath, '.gitignore'),
      'node_modules\ndist\n.env\n'
    );
    logger.info('Initialized git repository');
  } catch (error) {
    logger.warn('Failed to initialize git repository:', error);
  }
}

async function createConfigFiles(projectPath: string, options: ProjectOptions): Promise<void> {
  const configFiles = {
    'package.json': createPackageJson(options),
    'tsconfig.json': createTsConfig(),
    'README.md': createReadme(options)
  };

  for (const [filename, content] of Object.entries(configFiles)) {
    await fs.writeFile(
      path.join(projectPath, filename),
      JSON.stringify(content, null, 2)
    );
    logger.info(`Created ${filename}`);
  }
}

function createPackageJson(options: ProjectOptions): object {
  return {
    name: options.name,
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'tsc && vite build',
      serve: 'vite preview',
      test: 'vitest'
    },
    dependencies: {},
    devDependencies: {},
    author: 'mohammadhossein-asadi',
    license: 'MIT',
    created: '2025-02-06T23:04:14Z'
  };
}

function createTsConfig(): object {
  return {
    compilerOptions: {
      target: 'ESNext',
      module: 'ESNext',
      moduleResolution: 'node',
      jsx: 'react-jsx',
      strict: true,
      outDir: './dist',
      esModuleInterop: true,
      skipLibCheck: true
    },
    include: ['src'],
    exclude: ['node_modules']
  };
}

function createReadme(options: ProjectOptions): string {
  return `# ${options.name}

Project created with Project Architect on ${new Date('2025-02-06T23:04:14Z').toISOString()}

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start development server:
\`\`\`bash
npm run dev
\`\`\`

## Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build for production
- \`npm run serve\`: Preview production build
- \`npm test\`: Run tests

## Author

mohammadhossein-asadi
`;
}