import chalk from 'chalk';

export class Logger {
  static info(message: string): void {
    console.log(chalk.blue('info'), message);
  }

  static success(message: string): void {
    console.log(chalk.green('success'), message);
  }

  static warning(message: string): void {
    console.log(chalk.yellow('warning'), message);
  }

  static error(message: string): void {
    console.log(chalk.red('error'), message);
  }

  static newLine(): void {
    console.log();
  }

  static welcomeMessage(): void {
    console.log(chalk.cyan(`
    ╔═══════════════════════════════════════╗
    ║         Project Architect CLI         ║
    ╚═══════════════════════════════════════╝
    `));
  }
}