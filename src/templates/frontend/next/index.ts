import { TemplateConfig } from '../../../types.js';

export function getNextTemplate(): TemplateConfig {
  const currentDate = new Date('2025-02-06T23:03:24Z');
  
  return {
    name: 'next-template',
    version: '1.0.0',
    dependencies: {
      'next': '^13.4.19',
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      '@vercel/analytics': '^1.0.2'
    },
    devDependencies: {
      '@types/node': '^20.5.0',
      '@types/react': '^18.2.20',
      '@types/react-dom': '^18.2.7',
      'typescript': '^5.1.6',
      'eslint': '^8.47.0',
      'eslint-config-next': '^13.4.19'
    },
    scripts: {
      'dev': 'next dev',
      'build': 'next build',
      'start': 'next start',
      'lint': 'next lint',
      'analyze': 'ANALYZE=true next build'
    }
  };
}