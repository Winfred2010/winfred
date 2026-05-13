import { useState, useEffect } from 'react';
import quotes from '../data/quotes';
import { getRandomColor } from '../utils/colors';

function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [usedQuotes, setUsedQuotes] = useState(new Set());
  const [colors, setColors] = useState({
    background: '#2c3e50',
    text: '#ecf0f1',
    button: '#3498db',
  });

  // Initialize with first random quote
  useEffect(() => {
    generateNewQuote();
  }, []);

  const generateNewQuote = () => {
    let availableQuotes = quotes.filter(quote => !usedQuotes.has(quote.quote));

    // If all quotes have been used, reset the used quotes
    if (availableQuotes.length === 0) {
      setUsedQuotes(new Set());
      availableQuotes = quotes;
    }

    // Get random quote from available ones
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];

    // Add to used quotes
    setUsedQuotes(prev => new Set([...prev, selectedQuote.quote]));

    // Generate new colors
    const newColors = {
      background: getRandomColor(),
      text: getRandomColor(),
      button: getRandomColor(),
    };

    setCurrentQuote(selectedQuote);
    setColors(newColors);
  };

  if (!currentQuote) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#2c3e50',
        color: '#ecf0f1',
        fontFamily: 'Arial, sans-serif',
      }}>
        Loading quote...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        transition: 'background 0.5s ease',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <blockquote
          style={{
            fontSize: '2rem',
            fontWeight: '300',
            lineHeight: '1.4',
            margin: '0 0 20px 0',
            color: colors.text,
            transition: 'color 0.5s ease',
            fontStyle: 'italic',
          }}
        >
          "{currentQuote.quote}"
        </blockquote>

        <cite
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: colors.text,
            transition: 'color 0.5s ease',
            display: 'block',
            marginBottom: '30px',
          }}
        >
          — {currentQuote.author || 'Unknown'}
        </cite>

        <button
          onClick={generateNewQuote}
          style={{
            background: colors.button,
            color: '#ffffff',
            border: 'none',
            borderRadius: '25px',
            padding: '12px 30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
          }}
        >
          New Quote
        </button>

        <div
          style={{
            marginTop: '20px',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {quotes.length - usedQuotes.size} quotes remaining
        </div>
      </div>
    </div>
  );
}

export default QuoteGenerator;
