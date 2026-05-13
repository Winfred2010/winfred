import { useContext } from 'react';
import ThemeContext from './ThemeContext';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const label = theme === 'light' ? 'Switch to Dark' : 'Switch to Light';

  const buttonStyle = {
    padding: '0.85rem 1.5rem',
    border: 'none',
    borderRadius: 999,
    cursor: 'pointer',
    backgroundColor: theme === 'light' ? '#111827' : '#f9fafb',
    color: theme === 'light' ? '#f9fafb' : '#111827',
    fontWeight: 600,
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  return (
    <button type="button" onClick={toggleTheme} style={buttonStyle}>
      {label}
    </button>
  );
}

export default ThemeSwitcher;