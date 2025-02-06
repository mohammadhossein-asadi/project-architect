import inquirer from 'inquirer';
import { createProject } from './utils/createProject.js';
import { Logger } from './utils/logging/Logger.js';
import { ProjectOptions } from './types.js';

const logger = new Logger();

export async function cli(): Promise<void> {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your project name?'
      },
      {
        type: 'list',
        name: 'framework',
        message: 'Which framework would you like to use?',
        choices: ['react', 'vue', 'angular', 'next', 'express', 'nest']
      }
    ]);

    const options: ProjectOptions = {
      ...answers,
      features: [],
      dependencies: []
    };

    await createProject(options);
    logger.info('Project created successfully!');
  } catch (error) {
    logger.error('Failed to create project:', error);
    process.exit(1);
  }
}