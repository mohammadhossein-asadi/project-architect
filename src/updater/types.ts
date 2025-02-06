export interface UpdateConfig {
  version: string;
  description: string;
  changes: string[];
  timestamp: string;
}

export interface UpdateResult {
  hasUpdates: boolean;
  availableUpdates?: UpdateConfig[];
  error?: Error;
}