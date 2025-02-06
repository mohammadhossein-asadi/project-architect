import inquirer from 'inquirer';
import { Framework, ProjectOptions } from '../../types.js';

export async function getProjectOptions(): Promise<ProjectOptions> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      validate: (input: string) => input.length > 0 || 'Project name is required'
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Select framework:',
      choices: Object.values(Framework)
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Select features:',
      choices: [
        'TypeScript',
        'ESLint',
        'Prettier',
        'Jest',
        'Docker',
        'CI/CD'
      ]
    }
  ]);

  return {
    ...answers,
    dependencies: []
  };
}