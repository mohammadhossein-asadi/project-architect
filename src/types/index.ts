export enum Framework {
  REACT = 'react',
  VUE = 'vue',
  ANGULAR = 'angular',
  NEXT = 'next',
  EXPRESS = 'express',
  NEST = 'nest'
}

export interface ProjectOptions {
  name: string;
  framework: Framework;
  typescript: boolean;
  testing: boolean;
  linting: boolean;
  type: 'frontend' | 'backend';
}

export interface TemplateConfig {
  framework: Framework;
  typescript: boolean;
  testing: boolean;
  linting: boolean;
  type: string;
}