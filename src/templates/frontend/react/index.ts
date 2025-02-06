import { TemplateConfig } from '../../../types.js';
import { getMainFiles } from './files/main.js';
import { getConfigFiles } from './files/config.js';
import { getComponentFiles } from './files/components.js';
import { getTestFiles } from './files/tests.js';
import { getDockerFiles } from './files/docker.js';
import { getCicdFiles } from './files/cicd.js';

export function getReactTemplate(): TemplateConfig {
  return {
    name: 'react-template',
    version: '1.0.0',
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.15.0',
      '@reduxjs/toolkit': '^1.9.5',
      'react-redux': '^8.1.2',
      'axios': '^1.4.0'
    },
    devDependencies: {
      '@types/react': '^18.2.20',
      '@types/react-dom': '^18.2.7',
      '@testing-library/react': '^14.0.0',
      '@testing-library/jest-dom': '^5.17.0',
      'vite': '^4.4.9',
      '@vitejs/plugin-react': '^4.0.4',
      'typescript': '^5.1.6'
    },
    scripts: {
      'dev': 'vite',
      'build': 'tsc && vite build',
      'preview': 'vite preview',
      'test': 'vitest',
      'lint': 'eslint src --ext ts,tsx'
    }
  };
}

export const files = {
  main: getMainFiles(),
  config: getConfigFiles(),
  components: getComponentFiles(),
  tests: getTestFiles(),
  docker: getDockerFiles(),
  cicd: getCicdFiles()
};