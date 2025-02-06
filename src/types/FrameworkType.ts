export type FrontendFramework =
  | 'react'
  | 'vue'
  | 'angular'
  | 'svelte'
  | 'next'
  | 'nuxt';

export type BackendFramework =
  | 'express'
  | 'nest'
  | 'django'
  | 'flask'
  | 'fastapi'
  | 'laravel';

export interface TemplateConfig {
  name: string;
  type: 'frontend' | 'backend';
  framework: FrontendFramework | BackendFramework;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  files: TemplateFile[];
}

export interface TemplateFile {
  path: string;
  content: string;
}