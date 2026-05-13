import { createContext, useReducer, useCallback } from 'react';

const WeatherContext = createContext(null);

const initialState = {
  favorites: JSON.parse(localStorage.getItem('weatherFavorites')) || [],
  currentLocation: null,
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  theme: localStorage.getItem('theme') || 'light',
  tempUnit: localStorage.getItem('tempUnit') || 'celsius',
};

function weatherReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'SET_CURRENT_WEATHER':
      return { ...state, currentWeather: action.payload };
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_FAVORITE': {
      const updated = [...state.favorites, action.payload];
      localStorage.setItem('weatherFavorites', JSON.stringify(updated));
      return { ...state, favorites: updated };
    }
    case 'REMOVE_FAVORITE': {
      const updated = state.favorites.filter((fav) => fav.id !== action.payload);
      localStorage.setItem('weatherFavorites', JSON.stringify(updated));
      return { ...state, favorites: updated };
    }
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };
    }
    case 'SET_TEMP_UNIT': {
      localStorage.setItem('tempUnit', action.payload);
      return { ...state, tempUnit: action.payload };
    }
    default:
      return state;
  }
}

export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const setCurrentLocation = useCallback((location) => {
    dispatch({ type: 'SET_CURRENT_LOCATION', payload: location });
  }, []);

  const setCurrentWeather = useCallback((weather) => {
    dispatch({ type: 'SET_CURRENT_WEATHER', payload: weather });
  }, []);

  const setForecast = useCallback((forecast) => {
    dispatch({ type: 'SET_FORECAST', payload: forecast });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const addFavorite = useCallback((favorite) => {
    dispatch({ type: 'ADD_FAVORITE', payload: favorite });
  }, []);

  const removeFavorite = useCallback((id) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const setTempUnit = useCallback((unit) => {
    dispatch({ type: 'SET_TEMP_UNIT', payload: unit });
  }, []);

  const isFavorited = useCallback((id) => {
    return state.favorites.some((fav) => fav.id === id);
  }, [state.favorites]);

  return (
    <WeatherContext.Provider
      value={{
        state,
        setCurrentLocation,
        setCurrentWeather,
        setForecast,
        setLoading,
        setError,
        addFavorite,
        removeFavorite,
        toggleTheme,
        setTempUnit,
        isFavorited,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContext;
