export class MetricsCollector {
  private metrics: Map<string, number>;

  constructor() {
    this.metrics = new Map();
  }

  public recordResourceTiming(entry: PerformanceEntry): void {
    this.metrics.set(`resource_${entry.name}`, entry.duration);
  }

  public recordError(error: Error): void {
    const errorCount = this.metrics.get('error_count') || 0;
    this.metrics.set('error_count', errorCount + 1);
  }

  public getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }
}