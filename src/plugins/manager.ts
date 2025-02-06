import { Plugin, PluginManager } from './types.js';
import { TemplateConfig } from '../types.js';
import logger from '../utils/logger.js';

export class PluginManagerImpl implements PluginManager {
  private plugins: Map<string, Plugin>;

  constructor() {
    this.plugins = new Map();
  }

  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      logger.warn(`Plugin ${plugin.name} is already registered. Overwriting...`);
    }
    this.plugins.set(plugin.name, plugin);
    logger.info(`Plugin ${plugin.name} registered successfully`);
  }

  apply(config: TemplateConfig, pluginNames: string[]): TemplateConfig {
    let resultConfig = { ...config };
    
    for (const name of pluginNames) {
      const plugin = this.plugins.get(name);
      if (!plugin) {
        logger.warn(`Plugin ${name} not found, skipping...`);
        continue;
      }
      
      try {
        resultConfig = plugin.apply(resultConfig);
        logger.info(`Applied plugin ${name} successfully`);
      } catch (error) {
        logger.error(`Failed to apply plugin ${name}:`, error);
        throw error;
      }
    }
    
    return resultConfig;
  }

  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  listPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }
}