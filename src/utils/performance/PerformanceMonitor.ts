import { Logger } from '../logging/Logger.js';

const logger = new Logger();

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceMetric>;
  private thresholds: Map<string, number>;

  private constructor() {
    this.metrics = new Map();
    this.thresholds = new Map();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMetric(name: string, metadata?: Record<string, any>): void {
    this.metrics.set(name, {
      name,
      startTime: Date.now(),
      metadata
    });
  }

  endMetric(name: string): void {
    const metric = this.metrics.get(name);
    if (!metric) {
      logger.warn(`No metric found with name: ${name}`);
      return;
    }

    metric.endTime = Date.now();
    metric.duration = metric.endTime - metric.startTime;

    const threshold = this.thresholds.get(name);
    if (threshold && metric.duration > threshold) {
      logger.warn(`Performance threshold exceeded for ${name}: ${metric.duration}ms (threshold: ${threshold}ms)`);
    }

    logger.info(`Performance metric ${name}: ${metric.duration}ms`, {
      metric,
      timestamp: '2025-02-06T23:16:35Z',
      user: 'mohammadhossein-asadi'
    });
  }

  setThreshold(name: string, threshold: number): void {
    this.thresholds.set(name, threshold);
  }

  getMetrics(): Record<string, PerformanceMetric> {
    return Object.fromEntries(this.metrics);
  }

  clearMetrics(): void {
    this.metrics.clear();
    logger.info('Performance metrics cleared');
  }
}