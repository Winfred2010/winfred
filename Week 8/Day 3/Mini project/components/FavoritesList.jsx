import { useWeather } from '../hooks/useWeather';
import FavoriteCard from './FavoriteCard';

function FavoritesList({ onSelectFavorite }) {
  const { state } = useWeather();
  const { favorites } = state;

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', color: '#999' }}>
        <p>No favorites yet. Add cities from the weather page!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {favorites.map((favorite) => (
        <FavoriteCard
          key={favorite.id}
          favorite={favorite}
          onSelect={() => onSelectFavorite(favorite)}
        />
      ))}
    </div>
  );
}

export default FavoritesList;
