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

export interface ProjectOptions {
  name: string;
  framework: FrontendFramework | BackendFramework;
  type: 'frontend' | 'backend';
  typescript: boolean;
  testing: boolean;
  linting: boolean;
  docker: boolean;
  cicd: boolean;
}

export interface TemplateConfig {
  name: string;
  type: 'frontend' | 'backend';
  framework: FrontendFramework | BackendFramework;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  files: TemplateFile[];
  typescript?: boolean;
}

export interface TemplateFile {
  path: string;
  content: string;
}