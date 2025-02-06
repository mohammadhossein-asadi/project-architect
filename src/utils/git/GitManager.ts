import { exec } from 'child_process';
import { promisify } from 'util';
import { Logger } from '../logging/Logger.js';

const execAsync = promisify(exec);
const logger = new Logger();

interface GitConfig {
  name: string;
  email: string;
  defaultBranch?: string;
}

export class GitManager {
  private static instance: GitManager;
  private workingDirectory: string;

  private constructor(workingDirectory: string) {
    this.workingDirectory = workingDirectory;
  }

  static getInstance(workingDirectory: string): GitManager {
    if (!GitManager.instance) {
      GitManager.instance = new GitManager(workingDirectory);
    }
    return GitManager.instance;
  }

  async init(config?: GitConfig): Promise<void> {
    try {
      await this.execute('git init');
      
      if (config) {
        await this.setConfig(config);
      }

      await this.createInitialCommit();
      logger.info('Git repository initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize git repository:', error);
      throw error;
    }
  }

  private async setConfig(config: GitConfig): Promise<void> {
    try {
      await this.execute(`git config user.name "${config.name}"`);
      await this.execute(`git config user.email "${config.email}"`);
      
      if (config.defaultBranch) {
        await this.execute(`git config init.defaultBranch "${config.defaultBranch}"`);
      }
      
      logger.info('Git configuration set successfully');
    } catch (error) {
      logger.error('Failed to set git configuration:', error);
      throw error;
    }
  }

  private async createInitialCommit(): Promise<void> {
    try {
      await this.execute('git add .');
      await this.execute(
        `git commit -m "Initial commit\n\nCreated by: ${this.getCurrentUser()}\nDate: ${this.getCurrentTimestamp()}"`
      );
      logger.info('Created initial commit');
    } catch (error) {
      logger.error('Failed to create initial commit:', error);
      throw error;
    }
  }

  async getCurrentBranch(): Promise<string> {
    try {
      const { stdout } = await this.execute('git rev-parse --abbrev-ref HEAD');
      return stdout.trim();
    } catch (error) {
      logger.error('Failed to get current branch:', error);
      throw error;
    }
  }

  async createBranch(branchName: string, checkout: boolean = true): Promise<void> {
    try {
      await this.execute(`git branch ${branchName}`);
      if (checkout) {
        await this.execute(`git checkout ${branchName}`);
      }
      logger.info(`Created branch: ${branchName}`);
    } catch (error) {
      logger.error(`Failed to create branch ${branchName}:`, error);
      throw error;
    }
  }

  async commit(message: string, files: string[] = ['.']): Promise<void> {
    try {
      if (files.length > 0) {
        await this.execute(`git add ${files.join(' ')}`);
      }
      
      await this.execute(
        `git commit -m "${message}\n\nAuthor: ${this.getCurrentUser()}\nDate: ${this.getCurrentTimestamp()}"`
      );
      
      logger.info('Changes committed successfully');
    } catch (error) {
      logger.error('Failed to commit changes:', error);
      throw error;
    }
  }

  private async execute(command: string): Promise<{ stdout: string; stderr: string }> {
    try {
      return await execAsync(command, { cwd: this.workingDirectory });
    } catch (error) {
      logger.error(`Git command failed: ${command}`, error);
      throw error;
    }
  }

  private getCurrentUser(): string {
    return 'mohammadhossein-asadi';
  }

  private getCurrentTimestamp(): string {
    return '2025-02-06T23:17:29Z';
  }
}