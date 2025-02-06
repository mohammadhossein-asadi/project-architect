import { TemplateConfig } from '../../../types.js';
import { getConfigFiles } from './files/config.js';
import { getRouteFiles } from './files/routes.js';
import { getControllerFiles } from './files/controllers.js';
import { getModelFiles } from './files/models.js';
import { getMiddlewareFiles } from './files/middleware.js';
import { getTestFiles } from './files/tests.js';
import { getDockerFiles } from './files/docker.js';
import { getCicdFiles } from './files/cicd.js';

export function getExpressTemplate(): TemplateConfig {
  return {
    name: 'express-template',
    version: '1.0.0',
    dependencies: {
      'express': '^4.18.2',
      'cors': '^2.8.5',
      'helmet': '^7.0.0',
      'mongoose': '^7.4.3',
      'dotenv': '^16.3.1'
    },
    devDependencies: {
      '@types/express': '^4.17.17',
      '@types/cors': '^2.8.13',
      'nodemon': '^3.0.1',
      'jest': '^29.6.2',
      'supertest': '^6.3.3'
    },
    scripts: {
      'start': 'node dist/index.js',
      'dev': 'nodemon src/index.ts',
      'build': 'tsc',
      'test': 'jest',
      'lint': 'eslint src/**/*.ts'
    }
  };
}

export const files = {
  config: getConfigFiles(),
  routes: getRouteFiles(),
  controllers: getControllerFiles(),
  models: getModelFiles(),
  middleware: getMiddlewareFiles(),
  tests: getTestFiles(),
  docker: getDockerFiles(),
  cicd: getCicdFiles()
};