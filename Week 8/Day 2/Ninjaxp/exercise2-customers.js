// ==================== EXERCISE 2: React Components ====================
// File: components/Customers.js

import React, { Component } from 'react';

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loading: true,
      errorMsg: ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/customers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ customers: data, loading: false });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, loading: false });
      });
  }

  render() {
    const { customers, loading, errorMsg } = this.state;

    if (loading) {
      return <div style={styles.loading}>Loading customers...</div>;
    }

    if (errorMsg) {
      return <div style={styles.error}>{errorMsg}</div>;
    }

    return (
      <section style={styles.section}>
        <h2 style={styles.heading}>Customers</h2>
        <ul style={styles.customerList}>
          {customers.map((customer) => (
            <li key={customer.id} style={styles.customerItem}>
              {customer.firstName} {customer.lastName}
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
    textAlign: 'center',
    color: '#666'
  },
  error: {
    padding: 20,
    color: '#d32f2f',
    textAlign: 'center'
  },
  section: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  customerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  customerItem: {
    padding: '12px 0',
    borderBottom: '1px dotted #999',
    textAlign: 'center'
  }
};

export default Customers;
