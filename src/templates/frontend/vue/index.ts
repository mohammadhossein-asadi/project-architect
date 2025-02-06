import { TemplateConfig } from '../../../types.js';

export function getVueTemplate(): TemplateConfig {
  return {
    name: 'vue-template',
    version: '1.0.0',
    dependencies: {
      'vue': '^3.3.4',
      'vue-router': '^4.2.4',
      'pinia': '^2.1.6',
      '@vueuse/core': '^10.3.0'
    },
    devDependencies: {
      '@vitejs/plugin-vue': '^4.3.1',
      '@vue/compiler-sfc': '^3.3.4',
      '@vue/test-utils': '^2.4.1',
      'typescript': '^5.1.6',
      'vite': '^4.4.9',
      'vitest': '^0.34.1'
    },
    scripts: {
      'dev': 'vite',
      'build': 'vue-tsc && vite build',
      'preview': 'vite preview',
      'test': 'vitest',
      'lint': 'eslint . --ext .vue,.js,.ts'
    }
  };
}