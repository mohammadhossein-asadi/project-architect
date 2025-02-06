import { TemplateConfig } from '../../../types';

export const djangoTemplate: TemplateConfig = {
  name: 'django',
  type: 'backend',
  framework: 'django',
  dependencies: {
    'django': '^4.2.3',
    'djangorestframework': '^3.14.0',
    'django-cors-headers': '^4.2.0',
    'django-environ': '^0.10.0',
    'psycopg2-binary': '^2.9.6',
    'gunicorn': '^21.2.0'
  },
  devDependencies: {
    'pytest': '^7.4.0',
    'pytest-django': '^4.5.2',
    'black': '^23.7.0',
    'isort': '^5.12.0',
    'flake8': '^6.0.0'
  },
  scripts: {
    'start': 'python manage.py runserver',
    'migrate': 'python manage.py migrate',
    'makemigrations': 'python manage.py makemigrations',
    'test': 'pytest',
    'lint': 'flake8 .',
    'format': 'black . && isort .'
  },
  files: []
};