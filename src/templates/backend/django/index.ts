import { TemplateConfig } from '../../../types.js';

export function getDjangoTemplate(): TemplateConfig {
  return {
    name: 'django-template',
    version: '1.0.0',
    dependencies: {
      'django': '^4.2.4',
      'djangorestframework': '^3.14.0',
      'django-cors-headers': '^4.2.0'
    },
    devDependencies: {
      'pytest': '^7.4.0',
      'pytest-django': '^4.5.2',
      'black': '^23.7.0'
    },
    scripts: {
      'start': 'python manage.py runserver',
      'migrate': 'python manage.py migrate',
      'test': 'pytest',
      'format': 'black .'
    }
  };
}