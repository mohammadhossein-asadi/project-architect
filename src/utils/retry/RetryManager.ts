import { Logger } from '../logging/Logger.js';
import { MetricsCollector } from '../metrics/MetricsCollector.js';

const logger = new Logger();
const metrics = MetricsCollector.getInstance();

interface RetryOptions {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
  timeout?: number;
}

interface RetryMetadata {
  attempt: number;
  startTime: string;
  lastAttempt?: string;
  nextAttempt?: string;
  error?: string;
}

export class RetryManager {
  private static instance: RetryManager;
  
  private constructor() {}

  static getInstance(): RetryManager {
    if (!RetryManager.instance) {
      RetryManager.instance = new RetryManager();
    }
    return RetryManager.instance;
  }

  async retry<T>(
    operation: () => Promise<T>,
    options: Partial<RetryOptions> = {}
  ): Promise<T> {
    const config: RetryOptions = {
      maxAttempts: options.maxAttempts || 3,
      initialDelay: options.initialDelay || 1000,
      maxDelay: options.maxDelay || 10000,
      backoffFactor: options.backoffFactor || 2,
      timeout: options.timeout
    };

    const metadata: RetryMetadata = {
      attempt: 0,
      startTime: '2025-02-06T23:20:01Z'
    };

    let lastError: Error | undefined;

    while (metadata.attempt < config.maxAttempts) {
      try {
        if (metadata.attempt > 0) {
          const delay = this.calculateDelay(metadata.attempt, config);
          await this.delay(delay);
        }

        metadata.attempt++;
        metadata.lastAttempt = '2025-02-06T23:20:01Z';

        const result = await this.executeWithTimeout(operation, config.timeout);
        
        this.recordSuccess(metadata);
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        metadata.error = lastError.message;
        
        this.recordFailure(metadata);

        if (metadata.attempt === config.maxAttempts) {
          logger.error('Max retry attempts reached', { metadata });
          throw new Error(`Operation failed after ${config.maxAttempts} attempts: ${lastError.message}`);
        }
      }
    }

    throw lastError;
  }

  private async executeWithTimeout<T>(
    operation: () => Promise<T>,
    timeout?: number
  ): Promise<T> {
    if (!timeout) {
      return operation();
    }

    return Promise.race([
      operation(),
      new Promise<T>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Operation timed out after ${timeout}ms`));
        }, timeout);
      })
    ]);
  }

  private calculateDelay(attempt: number, options: RetryOptions): number {
    const delay = options.initialDelay * Math.pow(options.backoffFactor, attempt - 1);
    return Math.min(delay, options.maxDelay);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private recordSuccess(metadata: RetryMetadata): void {
    logger.info('Operation succeeded', { metadata });
    metrics.record('retry_success', 1, {
      attempts: String(metadata.attempt),
      user: 'mohammadhossein-asadi'
    });
  }

  private recordFailure(metadata: RetryMetadata): void {
    logger.warn('Operation failed, will retry', { metadata });
    metrics.record('retry_failure', 1, {
      attempts: String(metadata.attempt),
      user: 'mohammadhossein-asadi'
    });
  }
}