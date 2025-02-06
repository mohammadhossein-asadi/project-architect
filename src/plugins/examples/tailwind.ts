import { Plugin } from '../types.js';
import { TemplateConfig } from '../../types.js';

export const tailwindPlugin: Plugin = {
  name: 'tailwind',
  description: 'Adds Tailwind CSS support',
  
  apply(config: TemplateConfig): TemplateConfig {
    return {
      ...config,
      dependencies: {
        ...config.dependencies,
        'tailwindcss': '^3.3.3',
        'postcss': '^8.4.27',
        'autoprefixer': '^10.4.14'
      },
      devDependencies: {
        ...config.devDependencies,
        'postcss-cli': '^10.1.0'
      },
      scripts: {
        ...config.scripts,
        'build:css': 'postcss src/styles/tailwind.css -o dist/styles.css'
      }
    };
  }
};