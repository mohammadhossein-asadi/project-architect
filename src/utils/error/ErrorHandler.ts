import { Logger } from '../logging/Logger.js';
import { MetricsCollector } from '../metrics/MetricsCollector.js';
import { NotificationManager, NotificationPriority, NotificationChannel } from '../notification/NotificationManager.js';

const logger = new Logger();
const metrics = MetricsCollector.getInstance();
const notificationManager = NotificationManager.getInstance();

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

interface ErrorMetadata {
  timestamp: string;
  user: string;
  component?: string;
  context?: Record<string, any>;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorCallbacks: Map<ErrorSeverity, ((error: Error, metadata: ErrorMetadata) => Promise<void>)[]>;

  private constructor() {
    this.errorCallbacks = new Map();
    this.initializeDefaultHandlers();
  }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private initializeDefaultHandlers(): void {
    // Default handler for critical errors
    this.registerHandler(ErrorSeverity.CRITICAL, async (error, metadata) => {
      await notificationManager.send(
        'Critical Error Detected',
        `Error: ${error.message}\nComponent: ${metadata.component}\nContext: ${JSON.stringify(metadata.context)}`,
        {
          priority: NotificationPriority.URGENT,
          channels: [NotificationChannel.EMAIL, NotificationChannel.SMS]
        }
      );
    });

    // Default handler for high severity errors
    this.registerHandler(ErrorSeverity.HIGH, async (error, metadata) => {
      await notificationManager.send(
        'High Severity Error',
        `Error: ${error.message}\nComponent: ${metadata.component}`,
        {
          priority: NotificationPriority.HIGH,
          channels: [NotificationChannel.EMAIL]
        }
      );
    });
  }

  registerHandler(
    severity: ErrorSeverity,
    handler: (error: Error, metadata: ErrorMetadata) => Promise<void>
  ): void {
    const handlers = this.errorCallbacks.get(severity) || [];
    handlers.push(handler);
    this.errorCallbacks.set(severity, handlers);
    
    logger.info(`Error handler registered for severity: ${severity}`);
  }

  async handleError(
    error: Error,
    severity: ErrorSeverity,
    component?: string,
    context?: Record<string, any>
  ): Promise<void> {
    const metadata: ErrorMetadata = {
      timestamp: '2025-02-06T23:22:48Z',
      user: 'mohammadhossein-asadi',
      component,
      context
    };

    logger.error(`Error in ${component || 'unknown component'}:`, error, metadata);

    metrics.record('error_occurred', 1, {
      severity,
      component: component || 'unknown',
      errorType: error.constructor.name
    });

    const handlers = this.errorCallbacks.get(severity) || [];
    
    try {
      await Promise.all(handlers.map(handler => handler(error, metadata)));
    } catch (handlerError) {
      logger.error('Error in error handler:', handlerError);
      metrics.record('error_handler_failed', 1, { severity });
    }
  }

  getRegisteredHandlers(): Record<ErrorSeverity, number> {
    return {
      [ErrorSeverity.LOW]: this.errorCallbacks.get(ErrorSeverity.LOW)?.length || 0,
      [ErrorSeverity.MEDIUM]: this.errorCallbacks.get(ErrorSeverity.MEDIUM)?.length || 0,
      [ErrorSeverity.HIGH]: this.errorCallbacks.get(ErrorSeverity.HIGH)?.length || 0,
      [ErrorSeverity.CRITICAL]: this.errorCallbacks.get(ErrorSeverity.CRITICAL)?.length || 0
    };
  }

  clearHandlers(severity?: ErrorSeverity): void {
    if (severity) {
      this.errorCallbacks.delete(severity);
      logger.info(`Cleared handlers for severity: ${severity}`);
    } else {
      this.errorCallbacks.clear();
      logger.info('Cleared all error handlers');
    }
  }
}