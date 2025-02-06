import { Plugin } from '../types';
import { TemplateConfig } from '../../types';

export const tailwindPlugin: Plugin = {
  name: 'tailwind',
  version: '1.0.0',
  description: 'Adds Tailwind CSS to the project',
  async apply(template: TemplateConfig): Promise<TemplateConfig> {
    const newTemplate = { ...template };

    // Add Tailwind dependencies
    newTemplate.devDependencies = {
      ...newTemplate.devDependencies,
      'tailwindcss': '^3.3.3',
      'postcss': '^8.4.27',
      'autoprefixer': '^10.4.14',
    };

    // Add Tailwind configuration files
    newTemplate.files.push({
      path: 'tailwind.config.js',
      content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,tsx,jsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    });

    newTemplate.files.push({
      path: 'postcss.config.js',
      content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
    });

    return newTemplate;
  }
};