import { TemplateConfig } from '../../../types';

export const fastapiTemplate: TemplateConfig = {
  name: 'fastapi',
  type: 'backend',
  framework: 'fastapi',
  dependencies: {
    'fastapi': '^0.100.0',
    'uvicorn': '^0.23.1',
    'sqlalchemy': '^2.0.19',
    'pydantic': '^2.1.1',
    'alembic': '^1.11.1',
    'python-jose': '^3.3.0',
    'passlib': '^1.7.4',
    'python-multipart': '^0.0.6'
  },
  devDependencies: {
    'pytest': '^7.4.0',
    'pytest-asyncio': '^0.21.1',
    'httpx': '^0.24.1',
    'black': '^23.7.0',
    'isort': '^5.12.0',
    'mypy': '^1.4.1'
  },
  scripts: {
    'start': 'uvicorn app.main:app --reload',
    'test': 'pytest',
    'lint': 'flake8 app tests',
    'format': 'black . && isort .',
    'type-check': 'mypy app'
  },
  files: []
};