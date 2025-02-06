import { cli } from './cli.js';
import { createProject } from './utils/createProject.js';
import { Logger } from './utils/logging/Logger.js';

const logger = new Logger();

async function main() {
  try {
    await cli();
  } catch (error) {
    logger.error('Application failed:', error);
    process.exit(1);
  }
}

main();

export { createProject };