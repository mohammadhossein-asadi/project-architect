import { TemplateConfig } from '../../../types';

export const nextTemplate: TemplateConfig = {
  name: 'next',
  type: 'frontend',
  framework: 'next',
  dependencies: {
    'next': '^13.4.12',
    'react': '^18.2.0',
    'react-dom': '^18.2.0',
    '@tanstack/react-query': '^4.29.19',
    'axios': '^1.4.0',
    'zustand': '^4.3.9'
  },
  devDependencies: {
    '@types/node': '^20.4.2',
    '@types/react': '^18.2.15',
    '@types/react-dom': '^18.2.7',
    'typescript': '^5.1.6',
    '@testing-library/react': '^14.0.0',
    '@testing-library/jest-dom': '^5.16.5',
    'jest': '^29.6.1',
    '@jest/types': '^29.6.1',
    'jest-environment-jsdom': '^29.6.1',
    'tailwindcss': '^3.3.3',
    'postcss': '^8.4.27',
    'autoprefixer': '^10.4.14'
  },
  scripts: {
    'dev': 'next dev',
    'build': 'next build',
    'start': 'next start',
    'lint': 'next lint',
    'test': 'jest',
    'test:watch': 'jest --watch'
  },
  files: []
};