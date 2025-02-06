import { ErrorInfo } from 'react';

interface ErrorPayload {
  message: string;
  stack?: string;
  componentStack?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
  environment: string;
}

export async function captureError(error: Error, errorInfo?: ErrorInfo): Promise<void> {
  const payload: ErrorPayload = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    metadata: {
      userAgent: navigator.userAgent,
      url: window.location.href,
      // Add any other relevant metadata
    },
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };

  try {
    await fetch('/api/error-reporting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError);
  }
}