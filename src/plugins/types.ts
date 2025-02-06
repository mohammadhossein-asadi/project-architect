import { TemplateConfig } from '../types';

export interface Plugin {
  name: string;
  version: string;
  description: string;
  apply: (template: TemplateConfig) => Promise<TemplateConfig>;
}

export interface PluginManager {
  registerPlugin: (plugin: Plugin) => void;
  applyPlugins: (template: TemplateConfig) => Promise<TemplateConfig>;
}