import inquirer from 'inquirer';
import { validateProjectName } from '../../utils/validators';
import { ProjectOptions } from '../../types';

export const getProjectDetails = async (
  name?: string
): Promise<ProjectOptions> => {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your project name?',
      when: !name,
      validate: validateProjectName,
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of project do you want to create?',
      choices: ['frontend', 'backend'],
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Which framework would you like to use?',
      choices: (answers: { type: string }) => {
        if (answers.type === 'frontend') {
          return ['react', 'vue', 'angular', 'svelte', 'next', 'nuxt'];
        }
        return ['express', 'nest', 'django', 'flask', 'fastapi', 'laravel'];
      },
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to use TypeScript?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'testing',
      message: 'Would you like to include testing setup?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'linting',
      message: 'Would you like to include linting and formatting setup?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'docker',
      message: 'Would you like to include Docker setup?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'cicd',
      message: 'Would you like to include CI/CD setup?',
      default: true,
    },
  ];

  const answers = await inquirer.prompt(questions);
  return {
    name: name || answers.name,
    ...answers,
  };
};