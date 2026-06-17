import { useState, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';
import FavoritesList from '../components/FavoritesList';
import * as weatherApi from '../services/weatherApi';

function FavoritesPage({ onSelectFavorite }) {
  const { state, theme } = useWeather();
  const { favorites } = state;

  const handleSelectFavorite = async (favorite) => {
    try {
      const weather = await weatherApi.getCurrentWeather(favorite.key);
      const forecast = await weatherApi.getForecast(favorite.key);

      onSelectFavorite({
        location: {
          Key: favorite.key,
          LocalizedName: favorite.name,
          Country: { LocalizedName: favorite.country },
        },
        weather,
        forecast,
      });
    } catch (error) {
      console.error('Failed to load favorite weather:', error);
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
        <h2 style={{ marginBottom: '24px' }}>Favorite Locations</h2>
        <FavoritesList onSelectFavorite={handleSelectFavorite} />
      </div>
    </main>
  );
}

export default FavoritesPage;
