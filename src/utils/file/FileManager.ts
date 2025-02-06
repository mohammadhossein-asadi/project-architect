import * as fs from 'fs/promises';
import * as path from 'path';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

export class FileManager {
  constructor(private basePath: string) {}

  async createDirectory(dirPath: string): Promise<void> {
    try {
      const fullPath = path.join(this.basePath, dirPath);
      await fs.mkdir(fullPath, { recursive: true });
      logger.info(`Created directory: ${fullPath}`);
    } catch (error) {
      logger.error(`Failed to create directory ${dirPath}:`, error);
      throw error;
    }
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');
      logger.info(`Written file: ${fullPath}`);
    } catch (error) {
      logger.error(`Failed to write file ${filePath}:`, error);
      throw error;
    }
  }

  async readFile(filePath: string): Promise<string> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      return content;
    } catch (error) {
      logger.error(`Failed to read file ${filePath}:`, error);
      throw error;
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      await fs.unlink(fullPath);
      logger.info(`Deleted file: ${fullPath}`);
    } catch (error) {
      logger.error(`Failed to delete file ${filePath}:`, error);
      throw error;
    }
  }

  async listFiles(dirPath: string): Promise<string[]> {
    try {
      const fullPath = path.join(this.basePath, dirPath);
      const files = await fs.readdir(fullPath);
      return files;
    } catch (error) {
      logger.error(`Failed to list files in ${dirPath}:`, error);
      throw error;
    }
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }
}