import { TemplateConfig } from '../../../types';
import { getMainFiles } from './files/main';
import { getConfigFiles } from './files/config';
import { getComponentFiles } from './files/components';
import { getTestFiles } from './files/tests';
import { getDockerFiles } from './files/docker';
import { getCicdFiles } from './files/cicd';

export const reactTemplate: TemplateConfig = {
  name: 'react',
  type: 'frontend',
  framework: 'react',
  dependencies: {
    'react': '^18.2.0',
    'react-dom': '^18.2.0',
    'react-router-dom': '^6.8.0',
    '@tanstack/react-query': '^4.29.0',
    'axios': '^1.4.0',
    'zustand': '^4.3.8',
  },
  devDependencies: {
    '@types/react': '^18.2.0',
    '@types/react-dom': '^18.2.0',
    '@vitejs/plugin-react': '^4.0.0',
    '@testing-library/react': '^14.0.0',
    '@testing-library/jest-dom': '^5.16.5',
    '@testing-library/user-event': '^14.4.3',
    'vite': '^4.3.9',
    'vitest': '^0.32.0',
    'typescript': '^5.0.4',
    'eslint': '^8.41.0',
    'eslint-plugin-react': '^7.32.2',
    'eslint-plugin-react-hooks': '^4.6.0',
    'prettier': '^2.8.8',
  },
  scripts: {
    'dev': 'vite',
    'build': 'tsc && vite build',
    'preview': 'vite preview',
    'test': 'vitest',
    'test:coverage': 'vitest run --coverage',
    'lint': 'eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
    'format': 'prettier --write "src/**/*.{ts,tsx}"'
  },
  files: [],
  typescript: true,
};