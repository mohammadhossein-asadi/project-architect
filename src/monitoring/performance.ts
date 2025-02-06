import { MetricsCollector } from './metrics';
import { Logger } from '../utils/logging/Logger';

export class PerformanceMonitor {
  private metrics: MetricsCollector;
  private logger: Logger;

  constructor() {
    this.metrics = new MetricsCollector();
    this.logger = new Logger('PerformanceMonitor');
  }

  public initializeMonitoring(): void {
    this.observeNetworkRequests();
    this.observeResourceLoading();
    this.observeJavaScriptErrors();
    this.collectPerformanceMetrics();
  }

  private observeNetworkRequests(): void {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      try {
        const response = await originalFetch(...args);
        this.recordNetworkRequest(startTime, performance.now(), response.status);
        return response;
      } catch (error) {
        this.recordNetworkError(error);
        throw error;
      }
    };
  }

  private recordNetworkRequest(startTime: number, endTime: number, status: number): void {
    const duration = endTime - startTime;
    this.metrics.recordHttpRequest(duration, status);
  }

  private recordNetworkError(error: unknown): void {
    this.metrics.incrementCounter('network_errors');
    this.logger.error('Network request failed', { error });
  }

  private collectPerformanceMetrics(): void {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.recordPerformanceMetric(entry);
        }
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
    }
  }

  private observeResourceLoading(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.initiatorType === 'resource') {
          this.metrics.recordResourceTiming(entry);
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private observeJavaScriptErrors(): void {
    window.addEventListener('error', (event) => {
      this.metrics.incrementCounter('js_errors');
      this.logger.error('JavaScript error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.metrics.incrementCounter('unhandled_rejections');
      this.logger.error('Unhandled Promise rejection', {
        reason: event.reason,
      });
    });
  }
}