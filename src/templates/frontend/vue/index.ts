import { TemplateConfig } from '../../../types';

export const vueTemplate: TemplateConfig = {
  name: 'vue',
  type: 'frontend',
  framework: 'vue',
  dependencies: {
    vue: '^3.3.4',
    'vue-router': '^4.2.4',
    pinia: '^2.1.6',
    axios: '^1.4.0',
  },
  devDependencies: {
    '@vitejs/plugin-vue': '^4.2.3',
    '@vue/compiler-sfc': '^3.3.4',
    '@vue/test-utils': '^2.4.1',
    typescript: '^5.0.2',
    vite: '^4.4.5',
    vitest: '^0.33.0',
    'vue-tsc': '^1.8.5',
  },
  scripts: {
    dev: 'vite',
    build: 'vue-tsc && vite build',
    preview: 'vite preview',
    test: 'vitest',
    lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
  },
  files: [],
};
