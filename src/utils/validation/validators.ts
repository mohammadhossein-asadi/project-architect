import { z } from 'zod';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

export const projectNameSchema = z
  .string()
  .min(1)
  .max(214)
  .regex(/^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/);

export const versionSchema = z
  .string()
  .regex(/^(\d+\.){2}\d+(-[a-zA-Z0-9]+)?$/);

export const urlSchema = z
  .string()
  .url()
  .startsWith('http');

export const emailSchema = z
  .string()
  .email();

export const metadataSchema = z.object({
  created: z.string().datetime(),
  author: z.string(),
  version: versionSchema,
  description: z.string().optional(),
  homepage: urlSchema.optional(),
  repository: z.string().optional()
});

export function validateProjectName(name: string): boolean {
  try {
    projectNameSchema.parse(name);
    return true;
  } catch (error) {
    logger.error('Invalid project name:', error);
    return false;
  }
}

export function validateVersion(version: string): boolean {
  try {
    versionSchema.parse(version);
    return true;
  } catch (error) {
    logger.error('Invalid version:', error);
    return false;
  }
}