import { LogLevel, LogEntry, LogMetadata } from './types';
import { LoggerConfig } from './config';
import { formatLogEntry } from './formatters';
import { LogTransport } from './transports/LogTransport';
import { ConsoleTransport } from './transports/ConsoleTransport';
import { HttpTransport } from './transports/HttpTransport';

export class Logger {
  private transports: LogTransport[] = [];
  private context: string;

  constructor(context: string) {
    this.context = context;
    this.configure(LoggerConfig.getDefaultConfig());
  }

  public configure(config: LoggerConfig): void {
    this.transports = [
      new ConsoleTransport(config.console),
      new HttpTransport(config.http),
    ];
  }

  public info(message: string, metadata?: LogMetadata): void {
    this.log(LogLevel.INFO, message, metadata);
  }

  public warn(message: string, metadata?: LogMetadata): void {
    this.log(LogLevel.WARN, message, metadata);
  }

  public error(message: string, metadata?: LogMetadata): void {
    this.log(LogLevel.ERROR, message, metadata);
  }

  public debug(message: string, metadata?: LogMetadata): void {
    this.log(LogLevel.DEBUG, message, metadata);
  }

  private log(level: LogLevel, message: string, metadata?: LogMetadata): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      metadata: {
        ...metadata,
        sessionId: this.getSessionId(),
        userId: this.getUserId(),
      },
    };

    const formattedEntry = formatLogEntry(entry);

    this.transports.forEach(transport => {
      transport.send(formattedEntry).catch(error => {
        console.error('Failed to send log entry:', error);
      });
    });
  }

  private getSessionId(): string {
    // Implement session ID logic
    return 'session-id';
  }

  private getUserId(): string {
    // Implement user ID logic
    return 'user-id';
  }
}