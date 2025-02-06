import { TemplateConfig } from '../../../types.js';

export function getLaravelTemplate(): TemplateConfig {
  return {
    name: 'laravel-template',
    version: '1.0.0',
    dependencies: {
      'php': '>=8.1',
      'laravel/framework': '^10.0',
      'laravel/sanctum': '^3.2',
      'laravel/tinker': '^2.8'
    },
    devDependencies: {
      'phpunit/phpunit': '^10.1',
      'mockery/mockery': '^1.6',
      'fakerphp/faker': '^1.9.1'
    },
    scripts: {
      'start': 'php artisan serve',
      'test': 'phpunit',
      'migrate': 'php artisan migrate',
      'seed': 'php artisan db:seed'
    }
  };
}