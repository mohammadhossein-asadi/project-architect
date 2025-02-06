import { TemplateConfig } from '../../../types.js';

export function getSvelteTemplate(): TemplateConfig {
  return {
    name: 'svelte-template',
    version: '1.0.0',
    dependencies: {
      'svelte': '^4.2.0',
      '@sveltejs/kit': '^1.24.0'
    },
    devDependencies: {
      '@sveltejs/adapter-auto': '^2.1.0',
      '@sveltejs/vite-plugin-svelte': '^2.4.5',
      'typescript': '^5.1.6',
      'vite': '^4.4.9',
      'vitest': '^0.34.1'
    },
    scripts: {
      'dev': 'vite dev',
      'build': 'vite build',
      'preview': 'vite preview',
      'test': 'vitest',
      'check': 'svelte-check --tsconfig ./tsconfig.json'
    }
  };
}