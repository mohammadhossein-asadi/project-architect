import * as crypto from 'crypto';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

export class SecurityManager {
  private static instance: SecurityManager;
  private algorithm = 'aes-256-gcm';
  private secretKey: Buffer;

  private constructor() {
    this.secretKey = crypto.scryptSync(process.env.SECRET_KEY || 'default-secret-key', 'salt', 32);
  }

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  encrypt(data: string): { encryptedData: string; iv: string; authTag: string } {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
      
      let encryptedData = cipher.update(data, 'utf8', 'hex');
      encryptedData += cipher.final('hex');
      
      const authTag = cipher.getAuthTag();

      return {
        encryptedData,
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex')
      };
    } catch (error) {
      logger.error('Encryption failed:', error);
      throw new Error('Encryption failed');
    }
  }

  decrypt(encryptedData: string, iv: string, authTag: string): string {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.secretKey,
        Buffer.from(iv, 'hex')
      );
      
      decipher.setAuthTag(Buffer.from(authTag, 'hex'));
      
      let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
      decryptedData += decipher.final('utf8');
      
      return decryptedData;
    } catch (error) {
      logger.error('Decryption failed:', error);
      throw new Error('Decryption failed');
    }
  }

  hashPassword(password: string): string {
    return crypto
      .pbkdf2Sync(password, 'salt', 100000, 64, 'sha512')
      .toString('hex');
  }

  verifyPassword(password: string, hash: string): boolean {
    const newHash = this.hashPassword(password);
    return crypto.timingSafeEqual(
      Buffer.from(newHash, 'hex'),
      Buffer.from(hash, 'hex')
    );
  }

  generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}