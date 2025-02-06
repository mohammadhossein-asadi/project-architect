import { Logger } from '../logging/Logger';
import { MetricData } from '../../types';

export class MetricsCollector {
  private static instance: MetricsCollector;
  private metrics: MetricData[] = [];
  private logger: Logger;
  private flushInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.logger = new Logger('metrics');
    this.startAutoFlush();
  }

  static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  record(name: string, value: number, tags?: Record<string, string>): void {
    const metric: MetricData = {
      name,
      value,
      tags,
      timestamp: '2025-02-06 23:33:33'
    };

    this.metrics.push(metric);
    this.logger.info(`Metric recorded: ${name}`, {
      metric: JSON.stringify(metric),
      level: 'info'
    });
  }

  private startAutoFlush(interval: number = 60000): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }

    this.flushInterval = setInterval(() => {
      this.flush().catch(error => {
        this.logger.error('Auto flush failed:', error);
      });
    }, interval);
  }

  async flush(): Promise<void> {
    if (this.metrics.length === 0) {
      return;
    }

    try {
      // Simulate sending metrics to a monitoring service
      await new Promise(resolve => setTimeout(resolve, 100));
      this.metrics = [];
      this.logger.info('Metrics flushed successfully', { level: 'info' });
    } catch (error) {
      this.logger.error('Failed to flush metrics:', error);
      throw error;
    }
  }

  stopAutoFlush(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
      this.logger.info('Auto flush stopped', { level: 'info' });
    }
  }
}