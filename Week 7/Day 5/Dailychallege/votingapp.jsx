import React, { useState } from 'react';

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);

  const handleVote = (index) => {
    // Create a new array by mapping over the current state
    setLanguages(languages.map((lang, i) => {
      // If the index matches, increase the votes by 1
      if (i === index) {
        return { ...lang, votes: lang.votes + 1 };
      }
      // Otherwise, return the language object unchanged
      return lang;
    }));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '40px' }}>
      <h1>Vote Your Language!</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {languages.map((lang, index) => (
          <div 
            key={lang.name} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#fffacd', // Light yellow background
              padding: '15px 20px', 
              width: '300px', 
              justifyContent: 'space-between',
              borderRadius: '5px'
            }}
          >
            <span style={{ fontWeight: 'bold', width: '30px' }}>{lang.votes}</span>
            <span style={{ flexGrow: 1, textAlign: 'left', marginLeft: '10px' }}>{lang.name}</span>
            <button 
              onClick={() => handleVote(index)} 
              style={{ 
                backgroundColor: '#4CAF50', // Green button
                color: 'white', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Click Here
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;