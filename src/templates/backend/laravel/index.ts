import { TemplateConfig } from '../../../types';

export const laravelTemplate: TemplateConfig = {
  name: 'laravel',
  type: 'backend',
  framework: 'laravel',
  dependencies: {
    'php': '>=8.1',
    'laravel/framework': '^10.0',
    'laravel/sanctum': '^3.2',
    'laravel/tinker': '^2.8'
  },
  devDependencies: {
    'fakerphp/faker': '^1.9.1',
    'laravel/pint': '^1.0',
    'laravel/sail': '^1.18',
    'mockery/mockery': '^1.4.4',
    'nunomaduro/collision': '^7.0',
    'phpunit/phpunit': '^10.1',
    'spatie/laravel-ignition': '^2.0'
  },
  scripts: {
    'post-autoload-dump': [
      'Illuminate\\Foundation\\ComposerScripts::postAutoloadDump',
      '@php artisan package:discover --ansi'
    ],
    'post-update-cmd': [
      '@php artisan vendor:publish --tag=laravel-assets --ansi --force'
    ],
    'post-root-package-install': [
      '@php -r "file_exists(\'.env\') || copy(\'.env.example\', \'.env\');"'
    ],
    'post-create-project-cmd': [
      '@php artisan key:generate --ansi'
    ]
  },
  files: []
};