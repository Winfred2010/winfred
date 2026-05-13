import React, { Component } from 'react';
import Modal from './Modal';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo: errorInfo });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  occurError = () => {
    this.setState({ hasError: true });
  };

  closeModal = () => {
    this.setState({ hasError: false, errorInfo: null });
  };

  render() {
    return (
      <>
        <button className="btn btn-danger" onClick={this.occurError}>
          Trigger Error
        </button>
        
        {this.state.hasError && (
          <Modal onClose={this.closeModal}>
            <h3>Error Occurred</h3>
            <p>An error has been caught by the Error Boundary.</p>
            {this.state.errorInfo && (
              <details style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                <summary>Error Details</summary>
                {this.state.errorInfo.componentStack}
              </details>
            )}
          </Modal>
        )}
        
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;