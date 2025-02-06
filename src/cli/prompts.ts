import inquirer from 'inquirer';
import chalk from 'chalk';
import type { ProjectConfig } from '../types/index.js';
import { getCurrentDateTime, getCurrentUser } from '../utils/helpers.js';

export async function getProjectConfig(): Promise<ProjectConfig> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: chalk.cyan('What is your project name?'),
      validate: (input: string) => {
        if (!input.trim()) return 'Project name cannot be empty!';
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) return 'Project name can only contain letters, numbers, hyphens and underscores';
        return true;
      }
    },
    {
      type: 'list',
      name: 'type',
      message: chalk.cyan('What type of project do you want to create?'),
      choices: [
        { name: '🎨 Frontend', value: 'frontend' },
        { name: '⚙️ Backend', value: 'backend' }
      ]
    },
    {
      type: 'list',
      name: 'framework',
      message: chalk.cyan('Which framework would you like to use?'),
      choices: (answers) => {
        if (answers.type === 'frontend') {
          return [
            { name: '⚛️ React', value: 'react' },
            { name: '✨ Vue', value: 'vue' },
            { name: '🎯 Next.js', value: 'next' }
          ];
        }
        return [
          { name: '🚂 Express', value: 'express' },
          { name: '🦅 Nest.js', value: 'nest' }
        ];
      }
    },
    {
      type: 'list',
      name: 'language',
      message: chalk.cyan('Which language would you like to use?'),
      choices: [
        { name: '💙 TypeScript', value: 'typescript' },
        { name: '💛 JavaScript', value: 'javascript' }
      ]
    },
    {
      type: 'list',
      name: 'tooling',
      message: chalk.cyan('Which build tool would you like to use?'),
      when: (answers) => answers.framework === 'react',
      choices: [
        { name: '⚡️ Vite (Recommended - Faster builds)', value: 'vite' },
        { name: '🔨 Create React App (Classic)', value: 'cra' }
      ]
    },
    {
      type: 'checkbox',
      name: 'features',
      message: chalk.cyan('Select additional features:'),
      choices: [
        { name: '🧪 Testing Setup', value: 'testing' },
        { name: '🎨 ESLint + Prettier', value: 'linting' },
        { name: '🐳 Docker Configuration', value: 'docker' },
        { name: '🔄 CI/CD (GitHub Actions)', value: 'ci' }
      ]
    }
  ]);

  return {
    ...answers,
    version: '0.1.0',
    metadata: {
      createdAt: getCurrentDateTime(),
      createdBy: getCurrentUser(),
      lastModifiedAt: getCurrentDateTime(),
      lastModifiedBy: getCurrentUser()
    },
    customizations: {
      testing: answers.features.includes('testing'),
      linting: answers.features.includes('linting'),
      docker: answers.features.includes('docker'),
      ci: answers.features.includes('ci')
    }
  };
}