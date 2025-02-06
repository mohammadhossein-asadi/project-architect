import { z } from 'zod';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

interface ValidationOptions {
  strict?: boolean;
  errorMap?: z.ZodErrorMap;
}

export class ConfigValidator {
  private static instance: ConfigValidator;
  private schemas: Map<string, z.ZodSchema>;

  private constructor() {
    this.schemas = new Map();
    this.registerDefaultSchemas();
  }

  static getInstance(): ConfigValidator {
    if (!ConfigValidator.instance) {
      ConfigValidator.instance = new ConfigValidator();
    }
    return ConfigValidator.instance;
  }

  private registerDefaultSchemas(): void {
    const baseConfigSchema = z.object({
      created: z.string().datetime(),
      author: z.string(),
      version: z.string().regex(/^\d+\.\d+\.\d+$/),
      environment: z.enum(['development', 'testing', 'production']),
      debug: z.boolean().default(false)
    });

    this.registerSchema('baseConfig', baseConfigSchema);
  }

  registerSchema(name: string, schema: z.ZodSchema): void {
    this.schemas.set(name, schema);
    logger.info(`Schema registered: ${name}`);
  }

  validate<T>(schemaName: string, data: unknown, options?: ValidationOptions): T {
    const schema = this.schemas.get(schemaName);
    if (!schema) {
      logger.error(`Schema not found: ${schemaName}`);
      throw new Error(`Schema ${schemaName} not found`);
    }

    try {
      return schema.parse(data, options) as T;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Validation failed:', {
          schemaName,
          errors: error.errors,
          timestamp: '2025-02-06T23:18:37Z',
          user: 'mohammadhossein-asadi'
        });
      }
      throw error;
    }
  }

  async validateAsync<T>(
    schemaName: string,
    data: unknown,
    options?: ValidationOptions
  ): Promise<T> {
    const schema = this.schemas.get(schemaName);
    if (!schema) {
      logger.error(`Schema not found: ${schemaName}`);
      throw new Error(`Schema ${schemaName} not found`);
    }

    try {
      return await schema.parseAsync(data, options) as T;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Async validation failed:', {
          schemaName,
          errors: error.errors,
          timestamp: '2025-02-06T23:18:37Z',
          user: 'mohammadhossein-asadi'
        });
      }
      throw error;
    }
  }

  getSchema(name: string): z.ZodSchema | undefined {
    return this.schemas.get(name);
  }

  removeSchema(name: string): boolean {
    const removed = this.schemas.delete(name);
    if (removed) {
      logger.info(`Schema removed: ${name}`);
    }
    return removed;
  }
}