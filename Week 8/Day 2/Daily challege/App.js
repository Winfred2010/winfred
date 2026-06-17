// ==================== DAILY CHALLENGE #1: React App ====================
// File: client/App.js
// Make sure package.json has: "proxy": "http://localhost:3001"

import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helloMessage: '',
      inputValue: '',
      responseMessage: '',
      loading: true
    };
  }

  componentDidMount() {
    this.fetchHello();
  }

  // Part I: Fetch hello message from server
  fetchHello = async () => {
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      this.setState({ helloMessage: data.message, loading: false });
    } catch (error) {
      console.error('Error fetching hello:', error);
      this.setState({ loading: false });
    }
  };

  // Handle input change
  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  // Part II: Submit form and POST to server
  handleSubmit = async (event) => {
    event.preventDefault();
    const { inputValue } = this.state;

    try {
      const response = await fetch('/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputValue })
      });

      const data = await response.json();
      this.setState({
        responseMessage: data.message,
        inputValue: ''
      });
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  render() {
    const { helloMessage, inputValue, responseMessage, loading } = this.state;

    if (loading) {
      return <div style={styles.loading}>Loading...</div>;
    }

    return (
      <div style={styles.container}>
        {/* Part I: Display hello message */}
        <header style={styles.header}>
          <h1 style={styles.heading}>{helloMessage}</h1>
        </header>

        {/* Part II: Form */}
        <section style={styles.section}>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Type something..."
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Send
            </button>
          </form>

          {/* Display response message */}
          {responseMessage && (
            <div style={styles.response}>
              <p>{responseMessage}</p>
            </div>
          )}
        </section>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  loading: {
    padding: 20,
    textAlign: 'center',
    color: '#666'
  },
  header: {
    backgroundColor: '#222',
    color: '#fff',
    padding: '30px 20px',
    textAlign: 'center',
    marginBottom: 30
  },
  heading: {
    margin: 0,
    fontSize: 28
  },
  section: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: 8
  },
  form: {
    display: 'flex',
    gap: 10,
    marginBottom: 20
  },
  input: {
    flex: 1,
    padding: '12px 14px',
    borderRadius: 6,
    border: '1px solid #ddd',
    fontSize: 16
  },
  button: {
    padding: '12px 20px',
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#0d6efd',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer'
  },
  response: {
    padding: 16,
    backgroundColor: '#e8f4f8',
    borderRadius: 6,
    borderLeft: '4px solid #0d6efd'
  }
};

export default App;
