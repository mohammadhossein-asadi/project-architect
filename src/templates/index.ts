import { TemplateConfig } from '../types/FrameworkType';
import { reactTemplate } from './frontend/react';
import { vueTemplate } from './frontend/vue';
import { angularTemplate } from './frontend/angular';
import { nextTemplate } from './frontend/next';
import { expressTemplate } from './backend/express';
import { nestTemplate } from './backend/nest';

export const templates: Record<string, TemplateConfig> = {
  react: reactTemplate,
  vue: vueTemplate,
  angular: angularTemplate,
  next: nextTemplate,
  express: expressTemplate,
  nest: nestTemplate,
  // Add more templates here
};