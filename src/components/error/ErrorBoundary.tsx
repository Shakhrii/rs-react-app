import React, { type PropsWithChildren } from 'react';
import { ErrorView } from './ErrorView';

export default class ErrorBoundary extends React.Component<PropsWithChildren> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorView message="Render Error" buttonText={''} />;
    }
    return this.props.children;
  }
}
