import { Plugin, PluginManager } from './types';
import { TemplateConfig } from '../types';
import logger from '../utils/logger';

export class DefaultPluginManager implements PluginManager {
  private plugins: Plugin[] = [];

  registerPlugin(plugin: Plugin): void {
    logger.info(`Registering plugin: ${plugin.name}`);
    this.plugins.push(plugin);
  }

  async applyPlugins(template: TemplateConfig): Promise<TemplateConfig> {
    let result = { ...template };

    for (const plugin of this.plugins) {
      try {
        logger.info(`Applying plugin: ${plugin.name}`);
        result = await plugin.apply(result);
      } catch (error) {
        logger.error(`Error applying plugin ${plugin.name}:`, error);
        throw error;
      }
    }

    return result;
  }
}