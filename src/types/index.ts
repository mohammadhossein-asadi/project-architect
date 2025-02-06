export interface ProjectConfig {
  name: string;
  type: "frontend" | "backend";
  framework: string;
  language: "typescript" | "javascript";
  tooling?: "vite" | "cra";
  version: string;
  description?: string;
  author?: string;
  features: string[];
  metadata: ProjectMetadata;
  customizations: {
    testing: boolean;
    linting: boolean;
    docker: boolean;
    ci: boolean;
  };
}

export interface ProjectMetadata {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}

export interface Framework {
  name: string;
  type: "frontend" | "backend";
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  templates: Record<string, string>;
}
