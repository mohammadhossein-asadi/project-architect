import { MetricsCollector } from './metrics.js';
import { Logger } from '../utils/logging/Logger.js';

interface CustomPerformanceEntry extends PerformanceEntry {
  initiatorType?: string;
}

export class PerformanceMonitor {
  private metrics: MetricsCollector;
  private logger: Logger;

  constructor() {
    this.metrics = new MetricsCollector();
    this.logger = new Logger();
  }

  public startMonitoring(): void {
    this.observePerformance();
    this.setupErrorTracking();
  }

  private observePerformance(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.handlePerformanceEntry(entry as CustomPerformanceEntry);
      }
    });

    observer.observe({ entryTypes: ['resource', 'navigation'] });
  }

  private handlePerformanceEntry(entry: CustomPerformanceEntry): void {
    if (entry.initiatorType === 'resource') {
      this.metrics.recordResourceTiming(entry);
    }
  }

  private setupErrorTracking(): void {
    window.addEventListener('error', (event) => {
      this.logger.error('Runtime error:', event.error);
      this.metrics.recordError(event.error);
    });
  }
}