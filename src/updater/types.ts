export interface UpdateConfig {
  version: string;
  templates: string[];
  force: boolean;
}

export interface UpdateResult {
  success: boolean;
  updatedTemplates: string[];
  errors: string[];
}