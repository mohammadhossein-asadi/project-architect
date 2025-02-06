#!/usr/bin/env node
import { Command } from 'commander';
import { createProject } from './utils/createProject';
import { Logger } from './utils/logging/Logger';

const logger = new Logger('CLI');
const program = new Command();

program
  .name('project-architect')
  .description('CLI tool for scaffolding modern web applications')
  .version('1.0.0');

program
  .command('create <project-name>')
  .description('Create a new project')
  .option('-t, --type <type>', 'project type (frontend/backend/fullstack)', 'frontend')
  .option('-f, --framework <framework>', 'framework to use')
  .option('--typescript', 'use TypeScript', false)
  .option('--testing', 'include testing setup', false)
  .option('--docker', 'include Docker configuration', false)
  .option('--cicd', 'include CI/CD setup', false)
  .action(async (projectName, options) => {
    try {
      logger.info('Creating new project...', { projectName, options });
      await createProject({
        name: projectName,
        ...options
      });
      logger.info('Project created successfully! 🎉');
    } catch (error) {
      logger.error('Failed to create project:', error);
      process.exit(1);
    }
  });

program.parse();