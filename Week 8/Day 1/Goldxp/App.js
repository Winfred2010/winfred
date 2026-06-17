import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorInfo: null
    };
  }

  render() {
    return (
      <div className="App" style={{ padding: '50px', textAlign: 'center' }}>
        <h1>React Modal with Error Handling</h1>
        <ErrorBoundary />
      </div>
    );
  }
}

export default App;