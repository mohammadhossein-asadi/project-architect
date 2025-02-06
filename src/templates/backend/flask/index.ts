import { TemplateConfig } from '../../../types.js';

export function getFlaskTemplate(): TemplateConfig {
  return {
    name: 'flask-template',
    version: '1.0.0',
    dependencies: {
      'flask': '^2.3.3',
      'flask-sqlalchemy': '^3.0.5',
      'flask-migrate': '^4.0.4'
    },
    devDependencies: {
      'pytest': '^7.4.0',
      'pytest-flask': '^1.2.0',
      'black': '^23.7.0'
    },
    scripts: {
      'start': 'flask run',
      'test': 'pytest',
      'format': 'black .'
    }
  };
}