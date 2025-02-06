import { TemplateConfig } from '../../../types';

export const nestTemplate: TemplateConfig = {
  name: 'nest',
  type: 'backend',
  framework: 'nest',
  dependencies: {
    '@nestjs/common': '^10.0.0',
    '@nestjs/core': '^10.0.0',
    '@nestjs/platform-express': '^10.0.0',
    '@nestjs/swagger': '^7.0.0',
    '@nestjs/typeorm': '^10.0.0',
    '@nestjs/config': '^3.0.0',
    'class-validator': '^0.14.0',
    'class-transformer': '^0.5.1',
    'typeorm': '^0.3.17',
    'pg': '^8.11.0',
    'reflect-metadata': '^0.1.13',
    'rxjs': '^7.8.1'
  },
  devDependencies: {
    '@nestjs/cli': '^10.0.0',
    '@nestjs/schematics': '^10.0.0',
    '@nestjs/testing': '^10.0.0',
    '@types/express': '^4.17.17',
    '@types/jest': '^29.5.2',
    '@types/node': '^20.3.1',
    '@types/supertest': '^2.0.12',
    'jest': '^29.5.0',
    'prettier': '^2.8.8',
    'source-map-support': '^0.5.21',
    'supertest': '^6.3.3',
    'ts-jest': '^29.1.0',
    'ts-loader': '^9.4.3',
    'ts-node': '^10.9.1',
    'tsconfig-paths': '^4.2.0',
    'typescript': '^5.1.3'
  },
  scripts: {
    'build': 'nest build',
    'format': 'prettier --write "src/**/*.ts"',
    'start': 'nest start',
    'start:dev': 'nest start --watch',
    'start:debug': 'nest start --debug --watch',
    'start:prod': 'node dist/main',
    'lint': 'eslint "{src,apps,libs,test}/**/*.ts"',
    'test': 'jest',
    'test:watch': 'jest --watch',
    'test:cov': 'jest --coverage',
    'test:debug': 'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
    'test:e2e': 'jest --config ./test/jest-e2e.json'
  },
  files: []
};