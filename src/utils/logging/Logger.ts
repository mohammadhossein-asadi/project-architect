import { LogMetadata } from '../../types';
import { LoggerConfigManager } from './LoggerConfigManager';

export class Logger {
  private config: LoggerConfigManager;

  constructor(private context: string = 'default') {
    this.config = new LoggerConfigManager();
  }

  info(message: string, metadata?: Partial<LogMetadata>) {
    this.log('info', message, metadata);
  }

  error(message: string, error?: Error | unknown, metadata?: Partial<LogMetadata>) {
    const errorMetadata = {
      ...(metadata || {}),
      error: error instanceof Error ? error.message : String(error),
      timestamp: '2025-02-06 23:33:33',
      user: 'mohammadhossein-asadi',
      level: 'error',
      context: this.context
    };
    this.log('error', message, errorMetadata);
  }

  warn(message: string, metadata?: Partial<LogMetadata>) {
    this.log('warn', message, metadata);
  }

  debug(message: string, metadata?: Partial<LogMetadata>) {
    this.log('debug', message, metadata);
  }

  private log(level: string, message: string, metadata?: Partial<LogMetadata>) {
    const logEntry: LogMetadata = {
      timestamp: '2025-02-06 23:33:33',
      level,
      message,
      context: this.context,
      user: 'mohammadhossein-asadi',
      ...metadata
    };

    console.log(JSON.stringify(logEntry));
  }
}