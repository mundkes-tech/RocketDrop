import React from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleError = (error) => {
    setHasError(true);
    setError(error);
    console.error('Error caught by boundary:', error);
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error?.message || 'An unexpected error occurred'}</p>
          <button
            onClick={() => {
              setHasError(false);
              setError(null);
              window.location.href = '/';
            }}
            className="btn-primary"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  try {
    return children;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export default ErrorBoundary;
