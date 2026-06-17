import React, { Component } from 'react';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ posts: data });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message });
      });
  }

  render() {
    const { posts, errorMsg } = this.state;

    return (
      <section style={styles.section}>
        <h2 style={styles.title}>Posts</h2>
        {errorMsg ? (
          <p style={styles.error}>{errorMsg}</p>
        ) : posts.length > 0 ? (
          <div style={styles.grid}>
            {posts.map((post) => (
              <article key={post.id} style={styles.card}>
                <h3 style={styles.cardTitle}>{post.title}</h3>
                <p style={styles.cardText}>{post.body}</p>
              </article>
            ))}
          </div>
        ) : (
          <div style={styles.loading}>Loading posts...</div>
        )}
      </section>
    );
  }
}

const styles = {
  section: {
    marginBottom: 32
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#1f2937'
  },
  error: {
    color: '#b91c1c'
  },
  loading: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    color: '#374151'
  },
  grid: {
    display: 'grid',
    gap: 16
  },
  card: {
    padding: 18,
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)'
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 18,
    color: '#111827'
  },
  cardText: {
    lineHeight: 1.6,
    color: '#4b5563'
  }
};

export default PostList;
