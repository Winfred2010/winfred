import React from 'react';
import './App.css';
import Header from './components/Header';
import ColumnLeft from './columns/ColumnLeft';
import ColumnRight from './columns/ColumnRight';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <ColumnLeft />
          </div>
          <div className="col-md-6">
            <ErrorBoundary>
              <ColumnRight />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;