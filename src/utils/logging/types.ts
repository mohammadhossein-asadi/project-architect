export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  metadata?: LogMetadata;
}

export interface LogMetadata {
  [key: string]: unknown;
}

export interface TransportConfig {
  enabled: boolean;
  level: LogLevel;
}

export interface ConsoleTransportConfig extends TransportConfig {
  colors: boolean;
}

export interface HttpTransportConfig extends TransportConfig {
  endpoint: string;
  batchSize: number;
  flushInterval: number;
}