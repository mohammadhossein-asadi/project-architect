import { Logger } from '../logging/Logger.js';
import { MetricsCollector } from '../metrics/MetricsCollector.js';

const logger = new Logger();
const metrics = MetricsCollector.getInstance();

interface ScheduledTask {
  id: string;
  name: string;
  fn: () => Promise<void>;
  schedule: {
    type: 'interval' | 'cron';
    value: number | string;
  };
  metadata: {
    createdAt: string;
    createdBy: string;
    lastRun?: string;
    nextRun?: string;
    runCount: number;
  };
}

export class TaskScheduler {
  private static instance: TaskScheduler;
  private tasks: Map<string, ScheduledTask>;
  private intervals: Map<string, NodeJS.Timer>;

  private constructor() {
    this.tasks = new Map();
    this.intervals = new Map();
  }

  static getInstance(): TaskScheduler {
    if (!TaskScheduler.instance) {
      TaskScheduler.instance = new TaskScheduler();
    }
    return TaskScheduler.instance;
  }

  scheduleTask(
    name: string,
    fn: () => Promise<void>,
    schedule: { type: 'interval' | 'cron'; value: number | string }
  ): string {
    const id = this.generateTaskId();
    const task: ScheduledTask = {
      id,
      name,
      fn,
      schedule,
      metadata: {
        createdAt: '2025-02-06T23:21:58Z',
        createdBy: 'mohammadhossein-asadi',
        runCount: 0
      }
    };

    this.tasks.set(id, task);
    this.startTask(task);

    logger.info(`Task scheduled: ${name}`, { taskId: id });
    metrics.record('task_scheduled', 1, { taskName: name });

    return id;
  }

  private async executeTask(task: ScheduledTask): Promise<void> {
    try {
      task.metadata.lastRun = '2025-02-06T23:21:58Z';
      task.metadata.runCount++;

      await task.fn();

      logger.info(`Task executed successfully: ${task.name}`, {
        taskId: task.id,
        runCount: task.metadata.runCount
      });
      metrics.record('task_execution_success', 1, { taskName: task.name });
    } catch (error) {
      logger.error(`Task execution failed: ${task.name}`, error);
      metrics.record('task_execution_failure', 1, { taskName: task.name });
    }
  }

  private startTask(task: ScheduledTask): void {
    if (task.schedule.type === 'interval') {
      const interval = setInterval(
        () => this.executeTask(task),
        task.schedule.value as number
      );
      this.intervals.set(task.id, interval);
    } else {
      // TODO: Implement cron scheduling
      logger.warn('Cron scheduling not implemented yet');
    }
  }

  cancelTask(id: string): boolean {
    const task = this.tasks.get(id);
    if (!task) {
      logger.warn(`Task not found: ${id}`);
      return false;
    }

    const interval = this.intervals.get(id);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(id);
    }

    this.tasks.delete(id);
    logger.info(`Task cancelled: ${task.name}`, { taskId: id });
    metrics.record('task_cancelled', 1, { taskName: task.name });

    return true;
  }

  private generateTaskId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getTask(id: string): ScheduledTask | undefined {
    return this.tasks.get(id);
  }

  getAllTasks(): ScheduledTask[] {
    return Array.from(this.tasks.values());
  }

  getStats(): Record<string, any> {
    return {
      totalTasks: this.tasks.size,
      activeIntervals: this.intervals.size,
      timestamp: '2025-02-06T23:21:58Z',
      user: 'mohammadhossein-asadi'
    };
  }
}