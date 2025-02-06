import { TemplateConfig } from '../types/FrameworkType.js';
import { reactTemplate } from './frontend/react.js';
import { vueTemplate } from './frontend/vue.js';
import { angularTemplate } from './frontend/angular.js';
import { nextTemplate } from './frontend/next.js';
import { expressTemplate } from './backend/express.js';
import { nestTemplate } from './backend/nest.js';

export const templatesMap = {
  react: reactTemplate,
  vue: vueTemplate,
  angular: angularTemplate,
  next: nextTemplate,
  express: expressTemplate,
  nest: nestTemplate
};

export function getTemplate(name: string): TemplateConfig {
  const template = templatesMap[name];
  if (!template) {
    throw new Error(`Template ${name} not found`);
  }
  return template;
}

export const metadata = {
  lastUpdated: '2025-02-06T23:04:14Z',
  maintainer: 'mohammadhossein-asadi',
  version: '1.0.0'
};