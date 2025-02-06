import { TemplateConfig } from '../../../types';

export const svelteTemplate: TemplateConfig = {
  name: 'svelte',
  type: 'frontend',
  framework: 'svelte',
  dependencies: {
    '@sveltejs/kit': '^1.20.4',
    'svelte': '^4.0.5',
    'svelte-routing': '^2.0.0'
  },
  devDependencies: {
    '@sveltejs/adapter-auto': '^2.1.0',
    '@sveltejs/vite-plugin-svelte': '^2.4.2',
    'typescript': '^5.0.0',
    'svelte-check': '^3.4.3',
    'vite': '^4.4.2',
    'vitest': '^0.32.2',
    '@testing-library/svelte': '^4.0.3'
  },
  scripts: {
    'dev': 'vite',
    'build': 'vite build',
    'preview': 'vite preview',
    'check': 'svelte-check --tsconfig ./tsconfig.json',
    'test': 'vitest',
    'lint': 'eslint src --ext .ts,.svelte',
    'format': 'prettier --write "src/**/*.{ts,svelte}"'
  },
  files: []
};