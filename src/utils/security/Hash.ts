import * as crypto from 'crypto';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

export class Hash {
  private static instance: Hash;
  private readonly SALT_LENGTH = 16;
  private readonly HASH_LENGTH = 64;
  private readonly ITERATIONS = 100000;
  private readonly DIGEST = 'sha512';

  private constructor() {}

  static getInstance(): Hash {
    if (!Hash.instance) {
      Hash.instance = new Hash();
    }
    return Hash.instance;
  }

  async hash(data: string): Promise<{ hash: string; salt: string }> {
    try {
      const salt = crypto.randomBytes(this.SALT_LENGTH);
      const hash = await this.generateHash(data, salt);
      
      return {
        hash: hash.toString('hex'),
        salt: salt.toString('hex')
      };
    } catch (error) {
      logger.error('Hashing failed:', error);
      throw new Error('Hashing failed');
    }
  }

  async verify(data: string, hash: string, salt: string): Promise<boolean> {
    try {
      const calculatedHash = await this.generateHash(
        data,
        Buffer.from(salt, 'hex')
      );
      return calculatedHash.toString('hex') === hash;
    } catch (error) {
      logger.error('Hash verification failed:', error);
      throw new Error('Hash verification failed');
    }
  }

  private generateHash(data: string, salt: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        data,
        salt,
        this.ITERATIONS,
        this.HASH_LENGTH,
        this.DIGEST,
        (err, derivedKey) => {
          if (err) reject(err);
          else resolve(derivedKey);
        }
      );
    });
  }
}