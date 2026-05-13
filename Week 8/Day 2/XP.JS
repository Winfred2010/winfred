import React, { Component } from 'react';

class FetchPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { user, email } = this.state;
    const payload = { user, email };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log('Fetch POST response:', result);
    } catch (error) {
      console.error('Fetch POST error:', error);
    }
  };

  render() {
    const { user, email } = this.state;

    return (
      <div style={styles.card}>
        <h2>Exercise 1: POST JSON Data</h2>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <input
            type="text"
            name="user"
            placeholder="User"
            value={user}
            onChange={this.handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    );
  }
}

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Week 8 Day 2 - XP</h1>
      <FetchPostForm />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 720,
    margin: '0 auto',
    padding: 24,
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    marginBottom: 20,
    fontSize: 28
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  form: {
    display: 'grid',
    gap: 14
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16
  },
  button: {
    width: 120,
    padding: '10px 16px',
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#0d6efd',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer'
  }
};

export default App;
