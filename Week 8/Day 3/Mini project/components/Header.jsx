import { useWeather } from '../hooks/useWeather';

function Header({ currentPage, onPageChange }) {
  const { state, toggleTheme, setTempUnit } = useWeather();
  const { theme, tempUnit } = state;

  return (
    <header
      style={{
        background: theme === 'dark' ? '#1a1a1a' : '#fff',
        borderBottom: theme === 'dark' ? '1px solid #333' : '1px solid #ddd',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem', color: theme === 'dark' ? '#fff' : '#333' }}>
        Weather App
      </h1>

      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button
          onClick={() => onPageChange('weather')}
          style={{
            background: currentPage === 'weather' ? '#2563eb' : 'transparent',
            color: currentPage === 'weather' ? '#fff' : theme === 'dark' ? '#ccc' : '#333',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: currentPage === 'weather' ? 'bold' : 'normal',
            transition: 'all 0.2s',
          }}
        >
          Weather
        </button>

        <button
          onClick={() => onPageChange('favorites')}
          style={{
            background: currentPage === 'favorites' ? '#2563eb' : 'transparent',
            color: currentPage === 'favorites' ? '#fff' : theme === 'dark' ? '#ccc' : '#333',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: currentPage === 'favorites' ? 'bold' : 'normal',
            transition: 'all 0.2s',
          }}
        >
          ❤️ Favorites
        </button>

        <select
          value={tempUnit}
          onChange={(e) => setTempUnit(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
            background: theme === 'dark' ? '#333' : '#f5f5f5',
            color: theme === 'dark' ? '#fff' : '#333',
            cursor: 'pointer',
          }}
        >
          <option value="celsius">°C</option>
          <option value="fahrenheit">°F</option>
        </select>

        <button
          onClick={toggleTheme}
          style={{
            background: theme === 'dark' ? '#ffd700' : '#333',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
