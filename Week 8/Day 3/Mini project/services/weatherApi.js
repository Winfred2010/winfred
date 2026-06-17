const API_KEY = 'YOUR_ACCUWEATHER_API_KEY';
const BASE_URL = 'https://dataservice.accuweather.com';

export async function searchLocation(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${encodeURIComponent(
        query
      )}&language=en`
    );
    if (!response.ok) throw new Error('Search failed');
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to search locations');
  }
}

export async function getCurrentWeather(locationKey) {
  try {
    const response = await fetch(
      `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true&language=en`
    );
    if (!response.ok) throw new Error('Weather fetch failed');
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather');
  }
}

export async function getForecast(locationKey) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&details=true&language=en`
    );
    if (!response.ok) throw new Error('Forecast fetch failed');
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch forecast');
  }
}

export async function getLocationKeyByCoords(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}&language=en`
    );
    if (!response.ok) throw new Error('Geolocation lookup failed');
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to get location by coordinates');
  }
}

export const TEL_AVIV_KEY = '215854';
