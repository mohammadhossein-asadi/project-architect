import { exec } from 'child_process';
import { promisify } from 'util';
import { Logger } from '../logging/Logger.js';

const execAsync = promisify(exec);
const logger = new Logger();

interface Dependency {
  name: string;
  version: string;
  type: 'dependency' | 'devDependency';
}

export class DependencyManager {
  private static instance: DependencyManager;
  private packageManager: 'npm' | 'yarn' | 'pnpm';

  private constructor() {
    this.packageManager = 'npm'; // Default to npm
  }

  static getInstance(): DependencyManager {
    if (!DependencyManager.instance) {
      DependencyManager.instance = new DependencyManager();
    }
    return DependencyManager.instance;
  }

  async setPackageManager(manager: 'npm' | 'yarn' | 'pnpm'): Promise<void> {
    try {
      await execAsync(`${manager} --version`);
      this.packageManager = manager;
      logger.info(`Package manager set to: ${manager}`);
    } catch (error) {
      logger.error(`Failed to set package manager ${manager}:`, error);
      throw new Error(`${manager} is not installed`);
    }
  }

  async installDependency(dependency: Dependency): Promise<void> {
    const command = this.buildInstallCommand([dependency]);
    
    try {
      logger.info(`Installing dependency: ${dependency.name}`);
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr) {
        logger.warn(`Warning during installation: ${stderr}`);
      }
      
      logger.info(`Successfully installed ${dependency.name}`);
    } catch (error) {
      logger.error(`Failed to install ${dependency.name}:`, error);
      throw error;
    }
  }

  async installDependencies(dependencies: Dependency[]): Promise<void> {
    const command = this.buildInstallCommand(dependencies);
    
    try {
      logger.info(`Installing ${dependencies.length} dependencies`);
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr) {
        logger.warn(`Warnings during installation: ${stderr}`);
      }
      
      logger.info('Successfully installed all dependencies');
    } catch (error) {
      logger.error('Failed to install dependencies:', error);
      throw error;
    }
  }

  private buildInstallCommand(dependencies: Dependency[]): string {
    const devDeps = dependencies
      .filter(dep => dep.type === 'devDependency')
      .map(dep => `${dep.name}@${dep.version}`)
      .join(' ');

    const regularDeps = dependencies
      .filter(dep => dep.type === 'dependency')
      .map(dep => `${dep.name}@${dep.version}`)
      .join(' ');

    switch (this.packageManager) {
      case 'yarn':
        return `yarn add ${regularDeps}${devDeps ? ` -D ${devDeps}` : ''}`;
      case 'pnpm':
        return `pnpm add ${regularDeps}${devDeps ? ` -D ${devDeps}` : ''}`;
      default:
        return `npm install ${regularDeps}${devDeps ? ` -D ${devDeps}` : ''}`;
    }
  }
}