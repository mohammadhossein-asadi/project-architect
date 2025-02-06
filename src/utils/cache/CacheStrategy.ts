import { Logger } from '../logging/Logger.js';

const logger = new Logger();

export interface CacheItem<T> {
  value: T;
  expiry: number;
  metadata: {
    createdAt: string;
    createdBy: string;
    lastAccessed?: string;
    accessCount: number;
  };
}

export abstract class CacheStrategy<T> {
  protected cache: Map<string, CacheItem<T>>;
  protected maxSize: number;

  constructor(maxSize: number = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  set(key: string, value: T, ttl: number): void {
    if (this.cache.size >= this.maxSize) {
      this.evict();
    }

    const expiry = Date.now() + ttl;
    const item: CacheItem<T> = {
      value,
      expiry,
      metadata: {
        createdAt: '2025-02-06T23:19:20Z',
        createdBy: 'mohammadhossein-asadi',
        accessCount: 0
      }
    };

    this.cache.set(key, item);
    logger.info(`Cache item set: ${key}`);
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (this.isExpired(item)) {
      this.cache.delete(key);
      logger.info(`Cache item expired: ${key}`);
      return null;
    }

    item.metadata.lastAccessed = '2025-02-06T23:19:20Z';
    item.metadata.accessCount++;
    return item.value;
  }

  protected isExpired(item: CacheItem<T>): boolean {
    return Date.now() > item.expiry;
  }

  abstract evict(): void;

  clear(): void {
    this.cache.clear();
    logger.info('Cache cleared');
  }

  getStats(): Record<string, any> {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      timestamp: '2025-02-06T23:19:20Z',
      user: 'mohammadhossein-asadi'
    };
  }
}

export class LRUCacheStrategy<T> extends CacheStrategy<T> {
  evict(): void {
    if (this.cache.size === 0) return;

    let oldestKey: string | null = null;
    let oldestAccess = Infinity;

    for (const [key, item] of this.cache.entries()) {
      if (item.metadata.lastAccessed && new Date(item.metadata.lastAccessed).getTime() < oldestAccess) {
        oldestAccess = new Date(item.metadata.lastAccessed).getTime();
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      logger.info(`LRU Cache item evicted: ${oldestKey}`);
    }
  }
}

export class FIFOCacheStrategy<T> extends CacheStrategy<T> {
  evict(): void {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
      logger.info(`FIFO Cache item evicted: ${firstKey}`);
    }
  }
}