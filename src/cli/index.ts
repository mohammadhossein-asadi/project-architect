import { Command } from 'commander';
import { registerInitCommand } from './commands/init.js';
import { registerAddCommand } from './commands/add.js';
import { Logger } from '../utils/logging/Logger.js';

const logger = new Logger();

export function setupCLI(): Command {
  const program = new Command();

  program
    .name('project-architect')
    .description('CLI tool for creating and managing projects')
    .version('1.0.0');

  registerInitCommand(program);
  registerAddCommand(program);

  program.on('command:*', () => {
    logger.error('Invalid command');
    console.log('');
    program.help();
    process.exit(1);
  });

  return program;
}