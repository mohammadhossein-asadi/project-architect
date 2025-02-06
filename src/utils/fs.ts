import fs from 'fs-extra';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Logger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class FileSystem {
  static async createDirectory(path: string): Promise<void> {
    try {
      await fs.ensureDir(path);
    } catch (error) {
      Logger.error(`Failed to create directory: ${path}`);
      throw error;
    }
  }

  static async writeFile(path: string, content: string): Promise<void> {
    try {
      await fs.writeFile(path, content);
    } catch (error) {
      Logger.error(`Failed to write file: ${path}`);
      throw error;
    }
  }

  static async writeJSON(path: string, content: unknown): Promise<void> {
    try {
      await fs.writeJSON(path, content, { spaces: 2 });
    } catch (error) {
      Logger.error(`Failed to write JSON file: ${path}`);
      throw error;
    }
  }

  static getTemplatesPath(): string {
    return join(__dirname, '..', 'templates');
  }

  static async copyTemplate(
    templatePath: string,
    targetPath: string
  ): Promise<void> {
    try {
      await fs.copy(templatePath, targetPath);
    } catch (error) {
      Logger.error(`Failed to copy template from ${templatePath} to ${targetPath}`);
      throw error;
    }
  }
}