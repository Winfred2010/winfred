import React, { Component } from 'react';
import axios from 'axios';

class AxiosPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      title: '',
      body: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userId, title, body } = this.state;
    const payload = { userId, title, body };

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', payload);
      console.log('Axios POST response:', response.data);
    } catch (error) {
      console.error('Axios POST error:', error);
    }
  };

  render() {
    const { userId, title, body } = this.state;

    return (
      <div style={styles.card}>
        <h2>Exercise 1: POST JSON Data with Axios</h2>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <input
            type="number"
            name="userId"
            placeholder="UserId"
            value={userId}
            onChange={this.handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
            style={styles.input}
          />
          <textarea
            name="body"
            placeholder="Body"
            value={body}
            onChange={this.handleChange}
            style={{ ...styles.input, minHeight: 100 }}
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
      <h1 style={styles.heading}>Week 8 Day 2 - Gold XP</h1>
      <AxiosPostForm />
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
  heading: {
    marginBottom: 20,
    fontSize: 28,
    color: '#222'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 24,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  form: {
    display: 'grid',
    gap: 12
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16
  },
  button: {
    padding: '12px 18px',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#0d6efd',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer'
  }
};

export default App;
