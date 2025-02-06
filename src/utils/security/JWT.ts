import jwt from 'jsonwebtoken';
import { Logger } from '../logging/Logger.js';
import { MetricsCollector } from '../metrics/MetricsCollector.js';

const logger = new Logger();
const metrics = MetricsCollector.getInstance();

interface JWTPayload {
  userId: string;
  [key: string]: any;
}

interface JWTOptions {
  expiresIn?: string | number;
  algorithm?: jwt.Algorithm;
  issuer?: string;
  audience?: string;
}

export class JWT {
  private static instance: JWT;
  private secretKey: string;
  private defaultOptions: JWTOptions;

  private constructor(secretKey: string, options: JWTOptions = {}) {
    this.secretKey = secretKey;
    this.defaultOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
      ...options,
    };
  }

  static getInstance(secretKey: string, options?: JWTOptions): JWT {
    if (!JWT.instance) {
      JWT.instance = new JWT(secretKey, options);
    }
    return JWT.instance;
  }

  sign(payload: JWTPayload, options: JWTOptions = {}): string {
    try {
      const signOptions = {
        ...this.defaultOptions,
        ...options,
        algorithm:
          options.algorithm || (this.defaultOptions.algorithm as jwt.Algorithm),
      };

      const token = jwt.sign(payload, this.secretKey, signOptions);

      metrics.record('jwt_token_created', 1, {
        timestamp: '2025-02-06 23:26:37',
        user: 'mohammadhossein-asadi',
      });

      return token;
    } catch (error) {
      logger.error('JWT sign error:', error);
      metrics.record('jwt_token_creation_failed', 1);
      throw error;
    }
  }

  verify<T extends JWTPayload>(token: string): T {
    try {
      const decoded = jwt.verify(token, this.secretKey) as T;

      metrics.record('jwt_token_verified', 1, {
        timestamp: '2025-02-06 23:26:37',
        user: 'mohammadhossein-asadi',
      });

      return decoded;
    } catch (error) {
      logger.error('JWT verification error:', error);
      metrics.record('jwt_token_verification_failed', 1);
      throw error;
    }
  }

  decode<T extends JWTPayload>(token: string): T | null {
    try {
      const decoded = jwt.decode(token) as T;

      if (decoded) {
        metrics.record('jwt_token_decoded', 1);
      }

      return decoded;
    } catch (error) {
      logger.error('JWT decode error:', error);
      metrics.record('jwt_token_decode_failed', 1);
      throw error;
    }
  }

  refresh(token: string, newPayload: Partial<JWTPayload> = {}): string {
    try {
      const decoded = this.verify(token);
      const payload = { ...decoded, ...newPayload };

      delete payload.iat;
      delete payload.exp;
      delete payload.nbf;
      delete payload.jti;

      return this.sign(payload);
    } catch (error) {
      logger.error('JWT refresh error:', error);
      metrics.record('jwt_token_refresh_failed', 1);
      throw error;
    }
  }

  getTokenInfo(): Record<string, any> {
    return {
      defaultExpiresIn: this.defaultOptions.expiresIn,
      algorithm: this.defaultOptions.algorithm,
      issuer: this.defaultOptions.issuer,
      audience: this.defaultOptions.audience,
      timestamp: '2025-02-06 23:26:37',
      user: 'mohammadhossein-asadi',
    };
  }
}
