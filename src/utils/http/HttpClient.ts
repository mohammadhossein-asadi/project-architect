import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Logger } from '../logging/Logger.js';
import { MetricsCollector } from '../metrics/MetricsCollector.js';
import { RetryManager } from '../retry/RetryManager.js';

const logger = new Logger();
const metrics = MetricsCollector.getInstance();
const retryManager = RetryManager.getInstance();

interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  retryConfig?: {
    maxAttempts: number;
    initialDelay: number;
    maxDelay: number;
  };
  headers?: Record<string, string>;
}

export class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;
  private retryConfig: HttpClientConfig['retryConfig'];

  private constructor(config: HttpClientConfig) {
    this.retryConfig = config.retryConfig;
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
        'X-Client-Timestamp': '2025-02-06T23:22:48Z',
        'X-Client-User': 'mohammadhossein-asadi'
      }
    });

    this.setupInterceptors();
  }

  static getInstance(config: HttpClientConfig): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config);
    }
    return HttpClient.instance;
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const requestId = this.generateRequestId();
        config.headers['X-Request-ID'] = requestId;
        
        logger.info(`HTTP Request: ${config.method?.toUpperCase()} ${config.url}`, {
          requestId,
          headers: config.headers
        });
        
        return config;
      },
      (error) => {
        logger.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const requestId = response.config.headers['X-Request-ID'];
        logger.info(`HTTP Response: ${response.status} ${response.config.url}`, {
          requestId,
          status: response.status
        });
        
        metrics.record('http_request_success', 1, {
          method: response.config.method?.toUpperCase() || 'UNKNOWN',
          status: String(response.status)
        });
        
        return response;
      },
      (error) => {
        const requestId = error.config?.headers['X-Request-ID'];
        logger.error(`HTTP Error: ${error.message}`, {
          requestId,
          status: error.response?.status
        });
        
        metrics.record('http_request_error', 1, {
          method: error.config?.method?.toUpperCase() || 'UNKNOWN',
          status: String(error.response?.status || 'UNKNOWN')
        });
        
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.executeWithRetry(() => 
      this.axiosInstance.get<T>(url, config)
    );
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.executeWithRetry(() => 
      this.axiosInstance.post<T>(url, data, config)
    );
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.executeWithRetry(() => 
      this.axiosInstance.put<T>(url, data, config)
    );
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.executeWithRetry(() => 
      this.axiosInstance.delete<T>(url, config)
    );
  }

  private async executeWithRetry<T>(
    operation: () => Promise<AxiosResponse<T>>
  ): Promise<T> {
    if (!this.retryConfig) {
      const response = await operation();
      return response.data;
    }

    const result = await retryManager.retry(
      async () => {
        const response = await operation();
        return response.data;
      },
      {
        maxAttempts: this.retryConfig.maxAttempts,
        initialDelay: this.retryConfig.initialDelay,
        maxDelay: this.retryConfig.maxDelay
      }
    );

    return result;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getRequestStats(): Record<string, any> {
    return {
      baseURL: this.axiosInstance.defaults.baseURL,
      timeout: this.axiosInstance.defaults.timeout,
      retryConfig: this.retryConfig,
      timestamp: '2025-02-06T23:22:48Z',
      user: 'mohammadhossein-asadi'
    };
  }
}