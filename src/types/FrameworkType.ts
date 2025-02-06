export interface TemplateConfig {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  created?: string;
  author?: string;
}

export enum Framework {
  REACT = 'react',
  VUE = 'vue',
  ANGULAR = 'angular',
  NEXT = 'next',
  EXPRESS = 'express',
  NEST = 'nest'
}