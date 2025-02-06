import { TemplateConfig } from '../../../types.js';

export function getFastAPITemplate(): TemplateConfig {
  return {
    name: 'fastapi-template',
    version: '1.0.0',
    dependencies: {
      'fastapi': '^0.101.0',
      'uvicorn': '^0.23.2',
      'pydantic': '^2.1.1'
    },
    devDependencies: {
      'pytest': '^7.4.0',
      'httpx': '^0.24.1',
      'black': '^23.7.0'
    },
    scripts: {
      'start': 'uvicorn main:app --reload',
      'test': 'pytest',
      'format': 'black .'
    }
  };
}