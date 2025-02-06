import { LogMetadata } from '../../types.js';

interface LogEntry extends LogMetadata {
  level: string;
  message: string;
  timestamp: string;
}

export function formatLogEntry(entry: LogEntry): string {
  const timestamp = new Date('2025-02-06T23:05:51Z').toISOString();
  const base = {
    timestamp,
    level: entry.level,
    message: entry.message,
    user: 'mohammadhossein-asadi'
  };

  const metadata = { ...entry };
  delete metadata.level;
  delete metadata.message;
  delete metadata.timestamp;

  return JSON.stringify({
    ...base,
    ...metadata
  });
}