import { Plugin } from '../types.js';
import { TemplateConfig } from '../../types.js';

export const i18nPlugin: Plugin = {
  name: 'i18n',
  description: 'Adds internationalization support',
  
  apply(config: TemplateConfig): TemplateConfig {
    return {
      ...config,
      dependencies: {
        ...config.dependencies,
        'i18next': '^23.4.4',
        'react-i18next': '^13.1.2'
      },
      devDependencies: {
        ...config.devDependencies,
        '@types/i18next': '^13.0.0'
      }
    };
  }
};