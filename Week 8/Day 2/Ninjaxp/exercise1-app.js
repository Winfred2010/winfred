// ==================== EXERCISE 1: React Frontend ====================
// File: App.js (React Client)
// Make sure package.json has: "proxy": "http://localhost:3001"

import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      errorMsg: ''
    };
  }

  componentDidMount() {
    fetch('/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ users: data, loading: false });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, loading: false });
      });
  }

  render() {
    const { users, loading, errorMsg } = this.state;

    if (loading) {
      return <div style={styles.loading}>Loading users...</div>;
    }

    if (errorMsg) {
      return <div style={styles.error}>{errorMsg}</div>;
    }

    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>React & Express</h1>
        </header>

        <section style={styles.section}>
          <h2 style={styles.heading}>Users</h2>
          <ul style={styles.userList}>
            {users.map((user) => (
              <li key={user.id} style={styles.userItem}>
                {user.username}
              </li>
            ))}
          </ul>
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
  },
  loading: {
    padding: 20,
    textAlign: 'center',
    color: '#666'
  },
  error: {
    padding: 20,
    color: '#d32f2f',
    textAlign: 'center'
  },
  section: {
    padding: '0 20px'
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  userList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  userItem: {
    padding: '12px 0',
    borderBottom: '1px solid #ddd',
    textAlign: 'center'
  }
};

export default App;
