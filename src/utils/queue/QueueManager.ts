import { Logger } from '../logging/Logger.js';
import { MetricsCollector } from '../metrics/MetricsCollector.js';

const logger = new Logger();
const metrics = MetricsCollector.getInstance();

interface QueueItem<T> {
  id: string;
  data: T;
  priority: number;
  timestamp: string;
  metadata: {
    createdBy: string;
    attempts: number;
    lastAttempt?: string;
  };
}

export class QueueManager<T> {
  private static instances: Map<string, QueueManager<any>> = new Map();
  private queue: QueueItem<T>[];
  private processing: boolean;
  private maxRetries: number;
  private maxConcurrent: number;
  private activeProcesses: number;

  private constructor(
    private queueName: string,
    maxRetries: number = 3,
    maxConcurrent: number = 5
  ) {
    this.queue = [];
    this.processing = false;
    this.maxRetries = maxRetries;
    this.maxConcurrent = maxConcurrent;
    this.activeProcesses = 0;
  }

  static getInstance<T>(queueName: string, options?: { maxRetries?: number; maxConcurrent?: number }): QueueManager<T> {
    if (!QueueManager.instances.has(queueName)) {
      QueueManager.instances.set(
        queueName,
        new QueueManager<T>(queueName, options?.maxRetries, options?.maxConcurrent)
      );
    }
    return QueueManager.instances.get(queueName)!;
  }

  async enqueue(data: T, priority: number = 0): Promise<string> {
    const id = this.generateId();
    const item: QueueItem<T> = {
      id,
      data,
      priority,
      timestamp: '2025-02-06T23:20:01Z',
      metadata: {
        createdBy: 'mohammadhossein-asadi',
        attempts: 0
      }
    };

    this.queue.push(item);
    this.sortQueue();
    
    logger.info(`Item enqueued: ${id}`, { queueName: this.queueName });
    metrics.record('queue_enqueue', 1, { queue: this.queueName });

    return id;
  }

  async processQueue(processor: (data: T) => Promise<void>): Promise<void> {
    if (this.processing) {
      logger.warn('Queue is already being processed');
      return;
    }

    this.processing = true;
    logger.info(`Started processing queue: ${this.queueName}`);

    try {
      while (this.queue.length > 0 && this.activeProcesses < this.maxConcurrent) {
        const item = this.queue[0];
        
        if (item.metadata.attempts >= this.maxRetries) {
          logger.warn(`Item ${item.id} exceeded max retries`, { attempts: item.metadata.attempts });
          this.queue.shift();
          continue;
        }

        this.activeProcesses++;
        
        try {
          await processor(item.data);
          this.queue.shift();
          metrics.record('queue_process_success', 1, { queue: this.queueName });
        } catch (error) {
          item.metadata.attempts++;
          item.metadata.lastAttempt = '2025-02-06T23:20:01Z';
          logger.error(`Failed to process item ${item.id}:`, error);
          metrics.record('queue_process_error', 1, { queue: this.queueName });
        }

        this.activeProcesses--;
      }
    } finally {
      this.processing = false;
      logger.info(`Finished processing queue: ${this.queueName}`);
    }
  }

  private sortQueue(): void {
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  getQueueStats(): Record<string, any> {
    return {
      name: this.queueName,
      length: this.queue.length,
      activeProcesses: this.activeProcesses,
      maxConcurrent: this.maxConcurrent,
      maxRetries: this.maxRetries,
      timestamp: '2025-02-06T23:20:01Z',
      user: 'mohammadhossein-asadi'
    };
  }

  clearQueue(): void {
    this.queue = [];
    logger.info(`Queue cleared: ${this.queueName}`);
  }
}