import { Command } from 'commander';
import { Logger } from '../../utils/logging/Logger.js';
import { PluginManagerImpl } from '../../plugins/manager.js';

const logger = new Logger();
const pluginManager = new PluginManagerImpl();

export function registerAddCommand(program: Command): void {
  program
    .command('add <plugin>')
    .description('Add a plugin to the project')
    .option('-f, --force', 'Force add plugin even if it exists')
    .action(async (pluginName, options) => {
      try {
        const config = await pluginManager.apply({
          name: 'current-project',
          version: '1.0.0',
          dependencies: {},
          devDependencies: {},
          scripts: {}
        }, [pluginName]);

        logger.info(`Plugin ${pluginName} added successfully`);
        logger.info('Updated configuration:', config);
      } catch (error) {
        logger.error(`Failed to add plugin ${pluginName}:`, error);
        process.exit(1);
      }
    });
}