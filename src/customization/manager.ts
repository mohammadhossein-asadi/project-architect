import { ProjectOptions, TemplateConfig } from '../types.js';

export class CustomizationManager {
  private config: TemplateConfig;

  constructor(private options: ProjectOptions) {
    this.config = {
      name: options.name,
      version: '1.0.0',
      dependencies: {},
      devDependencies: {},
      scripts: {
        "start": "node dist/index.js",
        "build": "tsc",
        "test": "jest"
      }
    };
  }

  public customize(): TemplateConfig {
    this.addBaseDependencies();
    this.addFeatures();
    return this.config;
  }

  private addBaseDependencies(): void {
    this.config.dependencies = {
      ...this.config.dependencies,
      "typescript": "^5.1.6"
    };
  }

  private addFeatures(): void {
    if (this.options.features.includes('TypeScript')) {
      this.config.devDependencies['@types/node'] = '^20.5.0';
    }
    // Add more feature customizations as needed
  }
}