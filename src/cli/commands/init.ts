import { Command } from 'commander';
import { getProjectOptions } from '../prompts/projectPrompts.js';
import { createProject } from '../../utils/createProject.js';
import { Logger } from '../../utils/logging/Logger.js';

const logger = new Logger();

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a new project')
    .option('-y, --yes', 'Skip prompts and use defaults')
    .action(async (options) => {
      try {
        const projectOptions = options.yes 
          ? getDefaultOptions()
          : await getProjectOptions();
        
        await createProject(projectOptions);
        logger.info('Project initialized successfully');
      } catch (error) {
        logger.error('Failed to initialize project:', error);
        process.exit(1);
      }
    });
}

function getDefaultOptions() {
  return {
    name: 'my-project',
    framework: 'react',
    features: ['typescript', 'eslint', 'prettier'],
    dependencies: [],
    created: '2025-02-06T23:11:01Z',
    author: 'mohammadhossein-asadi'
  };
}