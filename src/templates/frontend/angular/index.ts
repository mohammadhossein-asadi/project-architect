import { TemplateConfig } from '../../../types';

export const angularTemplate: TemplateConfig = {
  name: 'angular',
  type: 'frontend',
  framework: 'angular',
  dependencies: {
    '@angular/animations': '^16.1.0',
    '@angular/common': '^16.1.0',
    '@angular/compiler': '^16.1.0',
    '@angular/core': '^16.1.0',
    '@angular/forms': '^16.1.0',
    '@angular/platform-browser': '^16.1.0',
    '@angular/platform-browser-dynamic': '^16.1.0',
    '@angular/router': '^16.1.0',
    'rxjs': '~7.8.0',
    'tslib': '^2.3.0',
    'zone.js': '~0.13.0'
  },
  devDependencies: {
    '@angular-devkit/build-angular': '^16.1.0',
    '@angular/cli': '^16.1.0',
    '@angular/compiler-cli': '^16.1.0',
    '@types/jasmine': '~4.3.0',
    'jasmine-core': '~4.6.0',
    'karma': '~6.4.0',
    'karma-chrome-launcher': '~3.2.0',
    'karma-coverage': '~2.2.0',
    'karma-jasmine': '~5.1.0',
    'karma-jasmine-html-reporter': '~2.1.0',
    'typescript': '~5.1.3'
  },
  scripts: {
    'ng': 'ng',
    'start': 'ng serve',
    'build': 'ng build',
    'watch': 'ng build --watch',
    'test': 'ng test',
    'lint': 'ng lint'
  },
  files: []
};