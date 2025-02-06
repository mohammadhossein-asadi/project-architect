import { Plugin } from '../types';
import { TemplateConfig } from '../../types';

export const i18nPlugin: Plugin = {
  name: 'i18n',
  version: '1.0.0',
  description: 'Adds internationalization support',
  async apply(template: TemplateConfig): Promise<TemplateConfig> {
    const newTemplate = { ...template };

    if (template.type === 'frontend') {
      // Add i18n dependencies based on framework
      switch (template.framework) {
        case 'react':
          newTemplate.dependencies['react-i18next'] = '^13.0.2';
          newTemplate.dependencies['i18next'] = '^23.2.11';
          break;
        case 'vue':
          newTemplate.dependencies['vue-i18n'] = '^9.2.2';
          break;
        case 'angular':
          newTemplate.dependencies['@ngx-translate/core'] = '^15.0.0';
          newTemplate.dependencies['@ngx-translate/http-loader'] = '^8.0.0';
          break;
      }

      // Add translation files
      newTemplate.files.push({
        path: 'src/locales/en.json',
        content: `{
  "common": {
    "welcome": "Welcome",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  },
  "auth": {
    "login": "Login",
    "logout": "Logout",
    "register": "Register"
  }
}`
      });
    }

    return newTemplate;
  }
};