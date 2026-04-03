import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center border border-red-500/20">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight uppercase">System Exception</h1>
              <p className="text-gray-400">
                An unexpected error occurred in the application layer. Our AI systems are already notified.
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left overflow-hidden">
                <p className="text-xs font-mono text-red-400 break-words line-clamp-3">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button 
                onClick={this.handleReset}
                icon={RefreshCw}
                className="w-full"
              >
                Reload Application
              </Button>
              <Button 
                variant="secondary"
                onClick={() => window.location.href = '/'}
                icon={Home}
                className="w-full"
              >
                Return Home
              </Button>
            </div>

            <p className="text-[10px] text-gray-600 uppercase tracking-widest">
              Error Internal Code: APP_CRASH_RECOVERY
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
