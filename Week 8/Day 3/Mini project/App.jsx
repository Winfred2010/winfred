import { useState } from 'react';
import { WeatherProvider } from './context/WeatherContext';
import { useWeather } from './hooks/useWeather';
import Header from './components/Header';
import Toast from './components/Toast';
import WeatherPage from './pages/WeatherPage';
import FavoritesPage from './pages/FavoritesPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('weather');
  const { state, setCurrentLocation, setCurrentWeather, setForecast, setLoading } = useWeather();
  const { error, theme } = state;

  const handleSelectFavorite = (data) => {
    setCurrentLocation(data.location);
    setCurrentWeather(data.weather);
    setForecast(data.forecast);
    setCurrentPage('weather');
  };

  return (
    <div
      style={{
        background: theme === 'dark' ? '#0a0a0a' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
        minHeight: '100vh',
        transition: 'all 0.3s ease',
      }}
    >
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />

      {currentPage === 'weather' && <WeatherPage />}
      {currentPage === 'favorites' && (
        <FavoritesPage onSelectFavorite={handleSelectFavorite} />
      )}

      {error && <Toast message={error} type="error" />}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;
