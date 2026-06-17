// ==================== DAILY CHALLENGE #2: AutoCompletedText Component ====================
// File: AutoCompletedText.js

import React, { Component } from 'react';
import countries from './countries';

class AutoCompletedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: ''
    };
  }

  // Handle input change and filter countries
  handleInputChange = (event) => {
    const input = event.target.value;
    let suggestions = [];

    if (input.length > 0) {
      suggestions = countries.filter((country) =>
        country.toLowerCase().startsWith(input.toLowerCase())
      );
    }

    this.setState({
      text: input,
      suggestions: suggestions
    });
  };

  // Handle country selection
  handleSelectCountry = (country) => {
    this.setState({
      text: country,
      suggestions: []
    });
  };

  render() {
    const { text, suggestions } = this.state;

    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Auto Completed</h2>

        <input
          type="text"
          value={text}
          onChange={this.handleInputChange}
          placeholder="Search countries..."
          style={styles.input}
        />

        {suggestions.length > 0 && (
          <ul style={styles.suggestionsList}>
            {suggestions.map((country, index) => (
              <li
                key={index}
                onClick={() => this.handleSelectCountry(country)}
                style={styles.suggestionItem}
              >
                {country}
              </li>
            ))}
          </ul>
        )}

        <div style={styles.suggestionsCount}>
          Suggestions: {suggestions.length}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    marginBottom: 12,
    borderRadius: 6,
    border: '1px solid #ddd',
    fontSize: 16,
    boxSizing: 'border-box'
  },
  suggestionsList: {
    listStyle: 'none',
    padding: 0,
    margin: '12px 0',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: 6,
    maxHeight: 300,
    overflowY: 'auto'
  },
  suggestionItem: {
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s'
  },
  suggestionsCount: {
    backgroundColor: '#ffc107',
    color: '#000',
    padding: '12px',
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 12
  }
};

export default AutoCompletedText;
