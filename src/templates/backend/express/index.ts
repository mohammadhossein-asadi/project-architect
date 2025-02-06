import { TemplateConfig } from '../../../types';
import { getMainFiles } from './files/main';
import { getConfigFiles } from './files/config';
import { getRouteFiles } from './files/routes';
import { getControllerFiles } from './files/controllers';
import { getModelFiles } from './files/models';
import { getMiddlewareFiles } from './files/middleware';
import { getTestFiles } from './files/tests';
import { getDockerFiles } from './files/docker';
import { getCicdFiles } from './files/cicd';

export const expressTemplate: TemplateConfig = {
  name: 'express',
  type: 'backend',
  framework: 'express',
  dependencies: {
    'express': '^4.18.2',
    'cors': '^2.8.5',
    'dotenv': '^16.0.3',
    'helmet': '^7.0.0',
    'mongoose': '^7.2.1',
    'morgan': '^1.10.0',
    'winston': '^3.9.0',
    'express-validator': '^7.0.1',
    'jsonwebtoken': '^9.0.0',
    'bcryptjs': '^2.4.3'
  },
  devDependencies: {
    '@types/express': '^4.17.17',
    '@types/cors': '^2.8.13',
    '@types/morgan': '^1.9.4',
    '@types/jsonwebtoken': '^9.0.2',
    '@types/bcryptjs': '^2.4.2',
    'typescript': '^5.0.4',
    'ts-node': '^10.9.1',
    'ts-node-dev': '^2.0.0',
    'jest': '^29.5.0',
    '@types/jest': '^29.5.2',
    'supertest': '^6.3.3',
    '@types/supertest': '^2.0.12'
  },
  scripts: {
    'start': 'node dist/index.js',
    'dev': 'ts-node-dev --respawn --transpile-only src/index.ts',
    'build': 'tsc',
    'test': 'jest',
    'test:watch': 'jest --watch',
    'lint': 'eslint . --ext .ts',
    'format': 'prettier --write "src/**/*.ts"'
  },
  files: []
};