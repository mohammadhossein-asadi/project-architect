import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

interface EnvConfig {
  path?: string;
  encoding?: BufferEncoding;
  override?: boolean;
}

export class EnvironmentManager {
  private static instance: EnvironmentManager;
  private envCache: Map<string, string>;
  private envPath: string;

  private constructor(config?: EnvConfig) {
    this.envCache = new Map();
    this.envPath = config?.path || '.env';
    this.initializeEnv(config);
  }

  static getInstance(config?: EnvConfig): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager(config);
    }
    return EnvironmentManager.instance;
  }

  private initializeEnv(config?: EnvConfig): void {
    try {
      dotenv.config({
        path: this.envPath,
        encoding: config?.encoding || 'utf8',
        override: config?.override || false
      });
      
      this.cacheEnvironmentVariables();
      logger.info('Environment variables initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize environment variables:', error);
      throw error;
    }
  }

  private cacheEnvironmentVariables(): void {
    Object.entries(process.env).forEach(([key, value]) => {
      if (value) {
        this.envCache.set(key, value);
      }
    });
  }

  get(key: string): string | undefined {
    const value = this.envCache.get(key) || process.env[key];
    if (!value) {
      logger.warn(`Environment variable not found: ${key}`);
    }
    return value;
  }

  set(key: string, value: string): void {
    process.env[key] = value;
    this.envCache.set(key, value);
    logger.info(`Environment variable set: ${key}`);
  }

  async saveToFile(): Promise<void> {
    try {
      const envContent = Array.from(this.envCache.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

      await fs.writeFile(this.envPath, envContent, 'utf8');
      logger.info('Environment variables saved to file successfully');
    } catch (error) {
      logger.error('Failed to save environment variables to file:', error);
      throw error;
    }
  }

  getAll(): Record<string, string> {
    return Object.fromEntries(this.envCache);
  }

  clear(): void {
    this.envCache.clear();
    logger.info('Environment cache cleared');
  }

  getMetadata(): Record<string, string> {
    return {
      timestamp: '2025-02-06T23:18:37Z',
      user: 'mohammadhossein-asadi',
      envPath: this.envPath,
      variableCount: String(this.envCache.size)
    };
  }
}