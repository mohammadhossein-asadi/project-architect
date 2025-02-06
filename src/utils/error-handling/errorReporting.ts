import { ErrorInfo } from 'react';
import { Logger } from '../logging/Logger.js';

const logger = new Logger();

interface ErrorPayload {
  error: Error;
  componentStack?: string;
  timestamp: string;
  user?: string;
  environment: string;
}

export function reportError(error: Error, errorInfo?: ErrorInfo): void {
  const payload: ErrorPayload = {
    error,
    componentStack: errorInfo?.componentStack || undefined,
    timestamp: new Date('2025-02-06T23:05:51Z').toISOString(),
    user: 'mohammadhossein-asadi',
    environment: process.env.NODE_ENV || 'development'
  };

  logger.error('Error reported:', payload);

  // Send to error tracking service
  sendToErrorTrackingService(payload).catch(err => {
    logger.error('Failed to send error to tracking service:', err);
  });
}

async function sendToErrorTrackingService(payload: ErrorPayload): Promise<void> {
  try {
    const response = await fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    logger.error('Error sending to tracking service:', error);
    throw error;
  }
}