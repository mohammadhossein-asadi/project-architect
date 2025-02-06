import React, { Component, ErrorInfo, ReactNode } from 'react';
import { captureError } from './errorReporting';
import { Logger } from '../logging/Logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  private logger: Logger;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.logger = new Logger('ErrorBoundary');
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.logger.error('Uncaught error:', {
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
    });

    captureError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}