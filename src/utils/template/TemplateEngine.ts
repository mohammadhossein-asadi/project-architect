import * as Handlebars from 'handlebars';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

export class TemplateEngine {
  private static instance: TemplateEngine;
  private handlebars: typeof Handlebars;

  private constructor() {
    this.handlebars = Handlebars;
    this.registerHelpers();
  }

  static getInstance(): TemplateEngine {
    if (!TemplateEngine.instance) {
      TemplateEngine.instance = new TemplateEngine();
    }
    return TemplateEngine.instance;
  }

  private registerHelpers(): void {
    this.handlebars.registerHelper('currentDate', () => {
      return new Date('2025-02-06T23:12:25Z').toISOString();
    });

    this.handlebars.registerHelper('currentUser', () => {
      return 'mohammadhossein-asadi';
    });

    this.handlebars.registerHelper('lowercase', (str: string) => {
      return str.toLowerCase();
    });

    this.handlebars.registerHelper('uppercase', (str: string) => {
      return str.toUpperCase();
    });
  }

  compile(template: string, data: object): string {
    try {
      const compiledTemplate = this.handlebars.compile(template);
      return compiledTemplate(data);
    } catch (error) {
      logger.error('Template compilation failed:', error);
      throw error;
    }
  }

  registerPartial(name: string, partial: string): void {
    try {
      this.handlebars.registerPartial(name, partial);
      logger.info(`Registered partial: ${name}`);
    } catch (error) {
      logger.error(`Failed to register partial ${name}:`, error);
      throw error;
    }
  }

  registerHelper(name: string, helper: Handlebars.HelperDelegate): void {
    try {
      this.handlebars.registerHelper(name, helper);
      logger.info(`Registered helper: ${name}`);
    } catch (error) {
      logger.error(`Failed to register helper ${name}:`, error);
      throw error;
    }
  }
}