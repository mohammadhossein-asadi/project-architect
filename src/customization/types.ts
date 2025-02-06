export interface CustomizationOptions {
  features: string[];
  styling: 'css' | 'scss' | 'tailwind';
  testing: 'jest' | 'vitest' | 'testing-library';
  stateManagement: 'redux' | 'mobx' | 'zustand' | 'none';
  api: 'rest' | 'graphql';
  database: 'mongodb' | 'postgresql' | 'mysql' | 'none';
}