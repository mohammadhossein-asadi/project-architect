import * as crypto from 'crypto';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

export class Encryption {
  private static instance: Encryption;
  private algorithm: string = 'aes-256-gcm';
  private keyLength: number = 32;

  private constructor() {}

  static getInstance(): Encryption {
    if (!Encryption.instance) {
      Encryption.instance = new Encryption();
    }
    return Encryption.instance;
  }

  async encrypt(data: string, key: string): Promise<{ encrypted: string; iv: string; authTag: string }> {
    try {
      const iv = crypto.randomBytes(16);
      const salt = crypto.randomBytes(64);
      const derivedKey = await this.deriveKey(key, salt);
      
      const cipher = crypto.createCipheriv(this.algorithm, derivedKey, iv);
      
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const authTag = cipher.getAuthTag();

      return {
        encrypted,
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex')
      };
    } catch (error) {
      logger.error('Encryption failed:', error);
      throw new Error('Encryption failed');
    }
  }

  async decrypt(encrypted: string, key: string, iv: string, authTag: string): Promise<string> {
    try {
      const salt = crypto.randomBytes(64);
      const derivedKey = await this.deriveKey(key, salt);
      
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        derivedKey,
        Buffer.from(iv, 'hex')
      );
      
      decipher.setAuthTag(Buffer.from(authTag, 'hex'));
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      logger.error('Decryption failed:', error);
      throw new Error('Decryption failed');
    }
  }

  private async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        100000,
        this.keyLength,
        'sha512',
        (err, derivedKey) => {
          if (err) reject(err);
          else resolve(derivedKey);
        }
      );
    });
  }

  generateKey(): string {
    return crypto.randomBytes(this.keyLength).toString('hex');
  }
}