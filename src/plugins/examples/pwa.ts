import { Plugin } from '../types.js';
import { TemplateConfig } from '../../types.js';

export const pwaPlugin: Plugin = {
  name: 'pwa',
  description: 'Adds Progressive Web App support',
  
  apply(config: TemplateConfig): TemplateConfig {
    return {
      ...config,
      dependencies: {
        ...config.dependencies,
        'workbox-core': '^7.0.0',
        'workbox-precaching': '^7.0.0',
        'workbox-routing': '^7.0.0'
      },
      devDependencies: {
        ...config.devDependencies,
        'workbox-webpack-plugin': '^7.0.0'
      },
      scripts: {
        ...config.scripts,
        'generate-sw': 'workbox generateSW workbox-config.js'
      }
    };
  }
};