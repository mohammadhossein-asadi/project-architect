import { TemplateConfig } from '../../../types.js';

export function getNestTemplate(): TemplateConfig {
  return {
    name: 'nest-template',
    version: '1.0.0',
    dependencies: {
      '@nestjs/common': '^10.1.3',
      '@nestjs/core': '^10.1.3',
      '@nestjs/platform-express': '^10.1.3',
      'reflect-metadata': '^0.1.13',
      'rxjs': '^7.8.1'
    },
    devDependencies: {
      '@nestjs/cli': '^10.1.11',
      '@nestjs/schematics': '^10.0.1',
      '@nestjs/testing': '^10.1.3',
      '@types/express': '^4.17.17',
      '@types/jest': '^29.5.3',
      'jest': '^29.6.2',
      'ts-jest': '^29.1.1'
    },
    scripts: {
      'build': 'nest build',
      'start': 'nest start',
      'start:dev': 'nest start --watch',
      'test': 'jest',
      'test:e2e': 'jest --config ./test/jest-e2e.json'
    }
  };
}