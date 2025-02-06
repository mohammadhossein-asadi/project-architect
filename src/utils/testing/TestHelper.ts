import { Logger } from '../logging/Logger.js';
import { MetricsCollector } from '../metrics/MetricsCollector.js';

const logger = new Logger();
const metrics = MetricsCollector.getInstance();

interface TestCase {
  name: string;
  fn: () => Promise<void>;
  timeout?: number;
  metadata?: Record<string, any>;
}

interface TestResult {
  name: string;
  success: boolean;
  duration: number;
  error?: Error;
  timestamp: string;
  metadata?: Record<string, any>;
}

export class TestHelper {
  private static instance: TestHelper;
  private results: TestResult[];

  private constructor() {
    this.results = [];
  }

  static getInstance(): TestHelper {
    if (!TestHelper.instance) {
      TestHelper.instance = new TestHelper();
    }
    return TestHelper.instance;
  }

  async runTest(testCase: TestCase): Promise<TestResult> {
    const startTime = Date.now();
    const result: TestResult = {
      name: testCase.name,
      success: false,
      duration: 0,
      timestamp: '2025-02-06T23:20:53Z',
      metadata: {
        ...testCase.metadata,
        runner: 'mohammadhossein-asadi'
      }
    };

    try {
      if (testCase.timeout) {
        await this.runWithTimeout(testCase.fn, testCase.timeout);
      } else {
        await testCase.fn();
      }

      result.success = true;
      metrics.record('test_success', 1, { test: testCase.name });
    } catch (error) {
      result.success = false;
      result.error = error instanceof Error ? error : new Error(String(error));
      metrics.record('test_failure', 1, { test: testCase.name });
    } finally {
      result.duration = Date.now() - startTime;
      this.results.push(result);
      this.logTestResult(result);
    }

    return result;
  }

  private async runWithTimeout(fn: () => Promise<void>, timeout: number): Promise<void> {
    return Promise.race([
      fn(),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Test timed out after ${timeout}ms`));
        }, timeout);
      })
    ]);
  }

  private logTestResult(result: TestResult): void {
    const status = result.success ? 'PASSED' : 'FAILED';
    const message = `Test ${status}: ${result.name} (${result.duration}ms)`;

    if (result.success) {
      logger.info(message, { result });
    } else {
      logger.error(message, { result, error: result.error });
    }
  }

  async runTests(tests: TestCase[]): Promise<TestResult[]> {
    const results: TestResult[] = [];
    
    for (const test of tests) {
      results.push(await this.runTest(test));
    }

    this.summarizeResults(results);
    return results;
  }

  private summarizeResults(results: TestResult[]): void {
    const total = results.length;
    const passed = results.filter(r => r.success).length;
    const failed = total - passed;
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

    logger.info('Test Summary:', {
      total,
      passed,
      failed,
      totalDuration,
      timestamp: '2025-02-06T23:20:53Z',
      user: 'mohammadhossein-asadi'
    });
  }

  getResults(): TestResult[] {
    return [...this.results];
  }

  clearResults(): void {
    this.results = [];
    logger.info('Test results cleared');
  }
}