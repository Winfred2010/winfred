import React from 'react';
import PostList from './PostList';
import UsersList from './UsersList';

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Users and Posts Mini Project</h1>
        <p style={styles.subtitle}>
          Fetch data from an API and display it using JSX inside class components.
        </p>
      </header>

      <PostList />
      <UsersList />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 980,
    margin: '0 auto',
    padding: '28px 24px',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    backgroundColor: '#f8fafc'
  },
  header: {
    marginBottom: 32
  },
  heading: {
    fontSize: 32,
    marginBottom: 10,
    color: '#111827'
  },
  subtitle: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 1.6
  }
};

export default App;
