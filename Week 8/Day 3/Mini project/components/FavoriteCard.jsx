import { useWeather } from '../hooks/useWeather';
import { convertTemperature, getWeatherIcon } from '../utils/helpers';

function FavoriteCard({ favorite, onSelect }) {
  const icon = getWeatherIcon(favorite.weather?.WeatherIcon || 1);
  const temp = convertTemperature(
    favorite.weather?.Temperature.Metric.Value || 0,
    localStorage.getItem('tempUnit') || 'celsius'
  );

  return (
    <div
      onClick={onSelect}
      style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
    >
      <div>
        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>
          {favorite.name}, {favorite.country}
        </h4>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
          {favorite.weather?.WeatherText || 'Loading...'}
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px' }}>{icon}</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {temp}°
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
