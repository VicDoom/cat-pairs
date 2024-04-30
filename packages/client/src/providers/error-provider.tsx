import React, { ErrorInfo, ReactNode } from 'react';
import { ThemeConfig } from 'antd/es/config-provider/context';

interface ErrorProviderProps {
  children: ReactNode;
  errorPage: React.ComponentType<{ error?: string; theme: ThemeConfig }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  theme: ThemeConfig;
}

interface ErrorProviderState {
  hasError: boolean;
  error?: string;
}

export class ErrorProvider extends React.Component<
  ErrorProviderProps,
  ErrorProviderState
> {
  constructor(props: ErrorProviderProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error: error.message });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const ErrorPageComponent = this.props.errorPage;
      return (
        <ErrorPageComponent error={this.state.error} theme={this.props.theme} />
      );
    }

    return this.props.children;
  }
}
