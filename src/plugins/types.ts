import { TemplateConfig } from '../types.js';

export interface Plugin {
  name: string;
  description: string;
  apply(config: TemplateConfig): TemplateConfig;
}

export interface PluginManager {
  register(plugin: Plugin): void;
  apply(config: TemplateConfig, pluginNames: string[]): TemplateConfig;
  getPlugin(name: string): Plugin | undefined;
  listPlugins(): Plugin[];
}