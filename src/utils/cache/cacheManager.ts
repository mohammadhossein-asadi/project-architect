import { Logger } from '../logging/Logger.js';

const logger = new Logger();

interface CacheOptions {
  ttl: number;  // Time to live in milliseconds
}

export class CacheManager {
  private cache: Map<string, { value: any; expires: number }>;
  private defaultOptions: CacheOptions;

  constructor(options: Partial<CacheOptions> = {}) {
    this.cache = new Map();
    this.defaultOptions = {
      ttl: 3600000, // 1 hour default TTL
      ...options
    };
  }

  set(key: string, value: any, options?: Partial<CacheOptions>): void {
    const ttl = options?.ttl ?? this.defaultOptions.ttl;
    const expires = Date.now() + ttl;
    
    this.cache.set(key, { value, expires });
    logger.info(`Cache entry set: ${key}`, { expires: new Date(expires).toISOString() });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (entry.expires < Date.now()) {
      this.cache.delete(key);
      logger.info(`Cache entry expired: ${key}`);
      return null;
    }

    return entry.value as T;
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      logger.info(`Cache entry deleted: ${key}`);
    }
    return deleted;
  }

  clear(): void {
    this.cache.clear();
    logger.info('Cache cleared');
  }
}