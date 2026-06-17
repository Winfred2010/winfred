import { useWeather } from '../hooks/useWeather';
import { convertTemperature, getWeatherIcon } from '../utils/helpers';

function CurrentWeather() {
  const { state } = useWeather();
  const { currentWeather, currentLocation, tempUnit } = state;

  if (!currentWeather || !currentLocation) {
    return <div style={{ textAlign: 'center', color: '#999' }}>Select a city to see weather</div>;
  }

  const temp = convertTemperature(currentWeather.Temperature.Metric.Value, tempUnit);
  const icon = getWeatherIcon(currentWeather.WeatherIcon);

  return (
    <div
      style={{
        background: '#f5f5f5',
        padding: '24px',
        borderRadius: '12px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ margin: '0 0 16px 0' }}>
        {currentLocation.LocalizedName}, {currentLocation.Country.LocalizedName}
      </h2>
      <div style={{ fontSize: '48px', margin: '16px 0' }}>{icon}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '16px 0' }}>
        {temp}°{tempUnit === 'celsius' ? 'C' : 'F'}
      </div>
      <p style={{ margin: '8px 0', color: '#666' }}>{currentWeather.WeatherText}</p>
      <p style={{ margin: '4px 0', color: '#999', fontSize: '0.9rem' }}>
        Feels like: {convertTemperature(currentWeather.RealFeelTemperature.Metric.Value, tempUnit)}°
      </p>
    </div>
  );
}

export default CurrentWeather;
