import { z } from 'zod';
import { Logger } from '../logging/Logger.js';
import { SchemaValidator } from '../validation/schemaValidator.js';

const logger = new Logger();

const ConfigSchema = z.object({
  apiUrl: z.string().url(),
  apiKey: z.string().min(1),
  timeout: z.number().positive(),
  debug: z.boolean(),
  createdAt: z.string().datetime(),
  author: z.string()
});

type Config = z.infer<typeof ConfigSchema>;

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Config;

  private constructor() {
    this.config = {
      apiUrl: process.env.API_URL || 'http://localhost:3000',
      apiKey: process.env.API_KEY || 'default-key',
      timeout: parseInt(process.env.TIMEOUT || '5000', 10),
      debug: process.env.DEBUG === 'true',
      createdAt: '2025-02-06T23:06:49Z',
      author: 'mohammadhossein-asadi'
    };

    const validation = SchemaValidator.validate(ConfigSchema, this.config);
    if (!validation.success) {
      logger.error('Invalid configuration:', validation.errors);
      throw new Error('Invalid configuration');
    }
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  getConfig(): Config {
    return { ...this.config };
  }

  updateConfig(updates: Partial<Config>): void {
    const newConfig = { ...this.config, ...updates };
    const validation = SchemaValidator.validate(ConfigSchema, newConfig);
    
    if (!validation.success) {
      logger.error('Invalid configuration update:', validation.errors);
      throw new Error('Invalid configuration update');
    }

    this.config = newConfig;
    logger.info('Configuration updated');
  }
}