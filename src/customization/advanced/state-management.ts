import { TemplateConfig } from '../../types.js';

export function configureStateManagement(config: TemplateConfig): TemplateConfig {
  return {
    ...config,
    dependencies: {
      ...config.dependencies,
      '@reduxjs/toolkit': '^1.9.5',
      'react-redux': '^8.1.2'
    },
    devDependencies: {
      ...config.devDependencies,
      '@types/react-redux': '^7.1.25'
    }
  };
}