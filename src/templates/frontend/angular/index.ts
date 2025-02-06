import { TemplateConfig } from '../../../types.js';

export function getAngularTemplate(): TemplateConfig {
  return {
    name: 'angular-template',
    version: '1.0.0',
    dependencies: {
      '@angular/core': '^16.1.0',
      '@angular/platform-browser': '^16.1.0',
      '@angular/router': '^16.1.0',
      '@angular/forms': '^16.1.0',
      'rxjs': '^7.8.1',
      'zone.js': '^0.13.1'
    },
    devDependencies: {
      '@angular-devkit/build-angular': '^16.1.0',
      '@angular/cli': '^16.1.0',
      '@angular/compiler-cli': '^16.1.0',
      '@types/jasmine': '^4.3.5',
      'jasmine-core': '^5.1.0',
      'karma': '^6.4.2',
      'typescript': '^5.1.6'
    },
    scripts: {
      'ng': 'ng',
      'start': 'ng serve',
      'build': 'ng build',
      'test': 'ng test',
      'lint': 'ng lint'
    }
  };
}