import React, { Component } from 'react';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loaded: false,
      errorMsg: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ users: data, loaded: true });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, loaded: true });
      });
  }

  render() {
    const { users, loaded, errorMsg } = this.state;

    if (!loaded) {
      return <div style={styles.loading}>Loading...</div>;
    }

    if (errorMsg) {
      return <div style={styles.error}>{errorMsg}</div>;
    }

    return (
      <section style={styles.section}>
        <h2 style={styles.title}>Users</h2>
        <ul style={styles.list}>
          {users.map((user) => (
            <li key={user.id} style={styles.userCard}>
              <p style={styles.userName}>{user.name}</p>
              <p style={styles.userEmail}>{user.email}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

const styles = {
  loading: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    color: '#374151'
  },
  error: {
    color: '#b91c1c'
  },
  section: {
    marginBottom: 32
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#1f2937'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gap: 12
  },
  userCard: {
    padding: 16,
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    boxShadow: '0 6px 14px rgba(15, 23, 42, 0.04)'
  },
  userName: {
    margin: 0,
    fontSize: 18,
    color: '#111827'
  },
  userEmail: {
    margin: '8px 0 0',
    color: '#4b5563'
  }
};

export default UsersList;
