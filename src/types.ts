export interface LogMetadata {
  timestamp: string;
  level: string;
  context?: string;
  [key: string]: any;
}

export interface MetricData {
  name: string;
  value: number;
  tags?: Record<string, string>;
  timestamp: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}