import { TemplateConfig } from '../../types.js';

export function configureAPI(config: TemplateConfig): TemplateConfig {
  return {
    ...config,
    dependencies: {
      ...config.dependencies,
      'axios': '^1.4.0',
      'express': '^4.18.2',
      'cors': '^2.8.5'
    },
    devDependencies: {
      ...config.devDependencies,
      '@types/express': '^4.17.17',
      '@types/cors': '^2.8.13'
    }
  };
}