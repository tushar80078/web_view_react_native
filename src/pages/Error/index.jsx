import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-12">
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-4">Something went wrong</h3>
            <p className="text-lg">
              We&apos;re so sorry, but an unexpected error occurred.
            </p>
            <p className="text-lg">
              Please try refreshing the page or contact support if the issue
              persists.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
