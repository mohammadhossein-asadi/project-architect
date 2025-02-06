interface LoggerConfig {
  minLevel: string;
  enabledLevels: Set<string>;
  format: string;
}

export class LoggerConfigManager {
  private config: LoggerConfig;

  constructor() {
    this.config = {
      minLevel: 'info',
      enabledLevels: new Set(['error', 'warn', 'info', 'debug']),
      format: 'json'
    };
  }

  isLevelEnabled(level: string): boolean {
    return this.config.enabledLevels.has(level);
  }

  getFormat(): string {
    return this.config.format;
  }

  setFormat(format: string): void {
    this.config.format = format;
  }

  setMinLevel(level: string): void {
    this.config.minLevel = level;
  }

  getConfig(): LoggerConfig {
    return { ...this.config };
  }
}