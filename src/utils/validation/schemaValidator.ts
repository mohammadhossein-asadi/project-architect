import { z } from 'zod';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

export class SchemaValidator {
  static validate<T>(schema: z.Schema<T>, data: unknown): ValidationResult<T> {
    try {
      const validatedData = schema.parse(data);
      return {
        success: true,
        data: validatedData
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Validation failed:', error);
        return {
          success: false,
          errors: error.errors.map(e => e.message)
        };
      }
      throw error;
    }
  }
}