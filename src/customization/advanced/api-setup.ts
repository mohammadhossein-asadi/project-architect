import { TemplateConfig } from '../../types';

export interface ApiSetupOptions {
  type: 'rest' | 'graphql';
  baseUrl: string;
  authentication?: boolean;
}

export const configureApiSetup = async (
  template: TemplateConfig,
  options: ApiSetupOptions
): Promise<TemplateConfig> => {
  const newTemplate = { ...template };

  if (options.type === 'rest') {
    newTemplate.dependencies = {
      ...newTemplate.dependencies,
      'axios': '^1.4.0',
      '@tanstack/react-query': '^4.32.0',
    };

    newTemplate.files.push({
      path: 'src/api/client.ts',
      content: `import axios from 'axios';

const apiClient = axios.create({
  baseURL: '${options.baseUrl}',
  headers: {
    'Content-Type': 'application/json',
  },
});

${options.authentication ? `
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
` : ''}

export default apiClient;`
    });
  } else if (options.type === 'graphql') {
    newTemplate.dependencies = {
      ...newTemplate.dependencies,
      '@apollo/client': '^3.7.17',
      'graphql': '^16.7.1',
    };

    newTemplate.files.push({
      path: 'src/api/client.ts',
      content: `import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
${options.authentication ? "import { setContext } from '@apollo/client/link/context';" : ''}

const httpLink = createHttpLink({
  uri: '${options.baseUrl}',
});

${options.authentication ? `
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? \`Bearer \${token}\` : "",
    }
  }
});
` : ''}

const client = new ApolloClient({
  link: ${options.authentication ? 'authLink.concat(httpLink)' : 'httpLink'},
  cache: new InMemoryCache(),
});

export default client;`
    });
  }

  return newTemplate;
};