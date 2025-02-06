import { z } from 'zod';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

export class ValidationRules {
  private static instance: ValidationRules;
  private rules: Map<string, z.ZodSchema>;

  private constructor() {
    this.rules = new Map();
    this.initializeDefaultRules();
  }

  static getInstance(): ValidationRules {
    if (!ValidationRules.instance) {
      ValidationRules.instance = new ValidationRules();
    }
    return ValidationRules.instance;
  }

  private initializeDefaultRules(): void {
    this.addRule('email', z.string().email());
    this.addRule('password', z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/));
    this.addRule('username', z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/));
    this.addRule('url', z.string().url());
    this.addRule('date', z.string().datetime());
    this.addRule('metadata', z.object({
      createdAt: z.string().datetime(),
      createdBy: z.string(),
      version: z.string()
    }));
  }

  addRule(name: string, schema: z.ZodSchema): void {
    this.rules.set(name, schema);
    logger.info(`Validation rule added: ${name}`, {
      timestamp: '2025-02-06T23:20:53Z',
      user: 'mohammadhossein-asadi'
    });
  }

  getRule(name: string): z.ZodSchema | undefined {
    return this.rules.get(name);
  }

  validate<T>(ruleName: string, value: unknown): { success: boolean; data?: T; error?: string } {
    const rule = this.rules.get(ruleName);
    if (!rule) {
      logger.error(`Validation rule not found: ${ruleName}`);
      return { success: false, error: `Validation rule '${ruleName}' not found` };
    }

    try {
      const result = rule.parse(value);
      return { success: true, data: result as T };
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(`Validation failed for rule ${ruleName}:`, error.errors);
        return { success: false, error: error.errors[0].message };
      }
      return { success: false, error: 'Unknown validation error' };
    }
  }

  removeRule(name: string): boolean {
    const removed = this.rules.delete(name);
    if (removed) {
      logger.info(`Validation rule removed: ${name}`);
    }
    return removed;
  }

  getRules(): string[] {
    return Array.from(this.rules.keys());
  }
}