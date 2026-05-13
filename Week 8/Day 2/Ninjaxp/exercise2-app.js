// ==================== EXERCISE 2: React App ====================
// File: App.js

import React from 'react';
import Customers from './components/Customers';

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>React & Express</h1>
      </header>
      <Customers />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#222',
    color: '#fff',
    padding: '30px 20px',
    textAlign: 'center',
    marginBottom: 30
  },
  title: {
    margin: 0,
    fontSize: 28
  }
};

export default App;
