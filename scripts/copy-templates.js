import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '..', 'src', 'templates');
const targetDir = join(__dirname, '..', 'dist', 'templates');

// Ensure the target directory exists
fs.ensureDirSync(targetDir);

// Copy templates
try {
  fs.copySync(sourceDir, targetDir);
  console.log('Templates copied successfully!');
} catch (err) {
  console.error('Error copying templates:', err);
  process.exit(1);
}