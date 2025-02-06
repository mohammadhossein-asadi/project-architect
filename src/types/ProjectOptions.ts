export type FrontendFramework = 'react' | 'vue' | 'angular' | 'next';
export type BackendFramework = 'express' | 'nest';
export type Framework = FrontendFramework | BackendFramework;

export interface ProjectOptions {
  framework: Framework;
  typescript: boolean;
  testing: boolean;
  linting: boolean;
  name: string;
  type: string;
}