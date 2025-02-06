import { spawn, SpawnOptions } from 'child_process';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

interface ProcessResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

export class ProcessManager {
  async execute(
    command: string,
    args: string[] = [],
    options: SpawnOptions = {}
  ): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      let stdout = '';
      let stderr = '';

      logger.info(`Executing command: ${command} ${args.join(' ')}`);

      const process = spawn(command, args, {
        ...options,
        shell: true
      });

      process.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      process.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('error', (error) => {
        logger.error(`Process error: ${error.message}`);
        reject(error);
      });

      process.on('close', (code) => {
        const duration = Date.now() - startTime;
        
        if (code === 0) {
          logger.info(`Command completed successfully in ${duration}ms`);
        } else {
          logger.warn(`Command exited with code ${code} after ${duration}ms`);
        }

        resolve({
          code,
          stdout: stdout.trim(),
          stderr: stderr.trim()
        });
      });
    });
  }

  async executeParallel(
    commands: Array<{ command: string; args?: string[]; options?: SpawnOptions }>
  ): Promise<ProcessResult[]> {
    const promises = commands.map(({ command, args = [], options = {} }) =>
      this.execute(command, args, options)
    );

    return Promise.all(promises);
  }
}