import { OpenAPIV3 } from 'openapi-types';

export const apiSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Project Architect API',
    version: '1.0.0',
    description: 'API documentation for Project Architect'
  },
  paths: {
    '/api/projects': {
      post: {
        summary: 'Create a new project',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProjectOptions'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Project created successfully'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      ProjectOptions: {
        type: 'object',
        required: ['name', 'framework', 'type'],
        properties: {
          name: { type: 'string' },
          framework: { type: 'string' },
          type: { type: 'string' },
          typescript: { type: 'boolean' },
          testing: { type: 'boolean' },
          linting: { type: 'boolean' }
        }
      }
    }
  }
};