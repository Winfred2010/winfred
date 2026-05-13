import { useState, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import * as weatherApi from '../services/weatherApi';

function WeatherPage() {
  const { state, setCurrentLocation, setCurrentWeather, setForecast, setLoading, setError, addFavorite, removeFavorite, isFavorited } = useWeather();
  const { currentLocation, currentWeather, loading, theme } = state;

  useEffect(() => {
    loadDefaultWeather();
  }, []);

  const loadDefaultWeather = async () => {
    try {
      setLoading(true);
      const weather = await weatherApi.getCurrentWeather(weatherApi.TEL_AVIV_KEY);
      const forecast = await weatherApi.getForecast(weatherApi.TEL_AVIV_KEY);

      setCurrentLocation({
        Key: weatherApi.TEL_AVIV_KEY,
        LocalizedName: 'Tel Aviv',
        Country: { LocalizedName: 'Israel' },
      });
      setCurrentWeather(weather);
      setForecast(forecast);
      setError(null);
    } catch (error) {
      setError('Failed to load default weather');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = () => {
    if (!currentLocation || !currentWeather) return;

    const isFav = isFavorited(currentLocation.Key);

    if (isFav) {
      removeFavorite(currentLocation.Key);
    } else {
      addFavorite({
        id: currentLocation.Key,
        name: currentLocation.LocalizedName,
        country: currentLocation.Country.LocalizedName,
        weather: currentWeather,
        key: currentLocation.Key,
      });
    }
  };

  return (
    <main
      style={{
        background: theme === 'dark' ? '#0a0a0a' : '#f8f8f8',
        color: theme === 'dark' ? '#fff' : '#333',
        minHeight: '100vh',
        padding: '24px 20px',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <SearchBar />
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '32px', color: '#999' }}>Loading...</div>}

        {!loading && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <CurrentWeather />
              {currentLocation && (
                <button
                  onClick={handleFavoriteClick}
                  style={{
                    marginTop: '16px',
                    width: '100%',
                    padding: '12px',
                    background: isFavorited(currentLocation.Key) ? '#ef4444' : '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  {isFavorited(currentLocation.Key) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                </button>
              )}
            </div>

            <Forecast />
          </>
        )}
      </div>
    </main>
  );
}

export default WeatherPage;
