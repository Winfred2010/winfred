import { useContext } from 'react';
import ThemeContext, { ThemeProvider } from './ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import CharacterCounter from './CharacterCounter';
import TodoList from './TodoList';

function AppContent() {
  const { theme } = useContext(ThemeContext);

  const pageStyle = {
    minHeight: '100vh',
    padding: '3rem 1.5rem',
    backgroundColor: theme === 'light' ? '#f8fafc' : '#111827',
    color: theme === 'light' ? '#111827' : '#f8fafc',
    transition: 'background 0.25s ease, color 0.25s ease',
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  const cardStyle = {
    maxWidth: 820,
    margin: '0 auto',
    padding: '2rem',
    borderRadius: 24,
    backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
    boxShadow: theme === 'light' ? '0 24px 80px rgba(15, 23, 42, 0.08)' : '0 24px 80px rgba(0, 0, 0, 0.45)',
    border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
    display: 'grid',
    gap: '2rem',
  };

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>React Day 3 Exercises</h1>
            <p style={{ margin: '0.75rem 0 0', lineHeight: 1.6, color: theme === 'light' ? '#4b5563' : '#cbd5e1' }}>
              Use context for theme switching and useRef for the live character counter.
            </p>
          </div>
          <ThemeSwitcher />
        </header>

        <section style={{ display: 'grid', gap: '1.75rem' }}>
          <CharacterCounter />
          <TodoList />
        </section>
      </div>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;