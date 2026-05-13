import { useWeather } from '../hooks/useWeather';
import { useState, useEffect } from 'react';
import * as weatherApi from '../services/weatherApi';
import { searchLocation } from '../services/weatherApi';

function SearchBar() {
  const { setCurrentLocation, setCurrentWeather, setForecast, setLoading, setError } =
    useWeather();
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (query) => {
    setInput(query);
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const results = await searchLocation(query);
      setSuggestions(results.slice(0, 10));
      setShowSuggestions(true);
    } catch (error) {
      setError(error.message);
      setSuggestions([]);
    }
  };

  const selectLocation = async (location) => {
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    setLoading(true);

    try {
      setCurrentLocation(location);
      const weather = await weatherApi.getCurrentWeather(location.Key);
      const forecast = await weatherApi.getForecast(location.Key);

      setCurrentWeather(weather);
      setForecast(forecast);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        placeholder="Search for a city..."
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          fontSize: '1rem',
          outline: 'none',
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #ddd',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 10,
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.Key}
              onClick={() => selectLocation(suggestion)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#f9f9f9')}
              onMouseLeave={(e) => (e.target.style.background = '#fff')}
            >
              {suggestion.LocalizedName}, {suggestion.Country.LocalizedName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
