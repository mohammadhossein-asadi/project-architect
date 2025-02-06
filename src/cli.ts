import { Command } from 'commander';
import { templates } from './templates';
import { createProject } from './utils/createProject';

const program = new Command();

program
  .name('project-architect')
  .description('CLI to create project templates with best practices')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new project')
  .argument('<name>', 'Project name')
  .option('-f, --framework <framework>', 'Framework to use')
  .option('-t, --type <type>', 'Project type (frontend/backend)')
  .action(async (name, options) => {
    try {
      await createProject(name, options);
    } catch (error) {
      console.error('Error creating project:', error);
      process.exit(1);
    }
  });

program.parse();