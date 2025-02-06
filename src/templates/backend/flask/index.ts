import { TemplateConfig } from '../../../types';

export const flaskTemplate: TemplateConfig = {
  name: 'flask',
  type: 'backend',
  framework: 'flask',
  dependencies: {
    'flask': '^2.3.3',
    'flask-sqlalchemy': '^3.0.5',
    'flask-migrate': '^4.0.4',
    'flask-cors': '^4.0.0',
    'flask-jwt-extended': '^4.5.2',
    'python-dotenv': '^1.0.0',
    'gunicorn': '^21.2.0'
  },
  devDependencies: {
    'pytest': '^7.4.0',
    'pytest-cov': '^4.1.0',
    'black': '^23.7.0',
    'flake8': '^6.0.0',
    'mypy': '^1.4.1'
  },
  scripts: {
    'start': 'flask run',
    'dev': 'flask run --debug',
    'test': 'pytest',
    'lint': 'flake8 .',
    'format': 'black .',
    'type-check': 'mypy .'
  },
  files: []
};