import { useWeather } from '../hooks/useWeather';
import { convertTemperature, getWeatherIcon, formatDate } from '../utils/helpers';

function Forecast() {
  const { state } = useWeather();
  const { forecast, tempUnit } = state;

  if (!forecast || !forecast.DailyForecasts) {
    return null;
  }

  return (
    <div>
      <h3 style={{ margin: '24px 0 16px 0' }}>5-Day Forecast</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
        }}
      >
        {forecast.DailyForecasts.map((day) => (
          <div
            key={day.Date}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
              transition: 'box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '0.9rem' }}>
              {formatDate(day.Date)}
            </p>
            <div style={{ fontSize: '32px', margin: '8px 0' }}>
              {getWeatherIcon(day.Day.Icon)}
            </div>
            <div style={{ margin: '8px 0', fontSize: '0.9rem' }}>
              <div style={{ color: '#666' }}>
                {convertTemperature(day.Temperature.Maximum.Value, tempUnit)}°
              </div>
              <div style={{ color: '#999', fontSize: '0.85rem' }}>
                {convertTemperature(day.Temperature.Minimum.Value, tempUnit)}°
              </div>
            </div>
            <p style={{ margin: '8px 0 0 0', fontSize: '0.8rem', color: '#666' }}>
              {day.Day.IconPhrase}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
