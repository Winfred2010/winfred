# Weather App - Herolo Assignment

## 📋 Project Structure

```
Mini project/
├── context/              # Global state management
│   └── WeatherContext.jsx     # Weather state & actions
├── services/            # API calls
│   └── weatherApi.js        # AccuWeather API integration
├── hooks/               # Custom React hooks
│   └── useWeather.js        # Weather context hook
├── components/          # Reusable components
│   ├── Header.jsx           # Navigation & settings
│   ├── SearchBar.jsx        # City search with autocomplete
│   ├── CurrentWeather.jsx   # Current weather display
│   ├── Forecast.jsx         # 5-day forecast
│   ├── FavoriteCard.jsx     # Favorite location card
│   ├── FavoritesList.jsx    # List of favorites
│   └── Toast.jsx            # Error notifications
├── pages/               # Page components
│   ├── WeatherPage.jsx      # Main weather page
│   └── FavoritesPage.jsx    # Favorites page
├── utils/               # Utility functions
│   └── helpers.js           # Temperature conversion, date formatting, icons
└── App.jsx              # Main app component
```

## 🚀 Features

- ✅ Search cities with autocomplete
- ✅ Display current weather & 5-day forecast
- ✅ Save/manage favorites locally
- ✅ Dark/Light theme toggle
- ✅ Celsius/Fahrenheit toggle
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Error handling with toast notifications
- ✅ State management with Context + useReducer

## 🔧 Setup

1. Get an API key from [AccuWeather](https://developer.accuweather.com/)
2. Replace `YOUR_ACCUWEATHER_API_KEY` in `services/weatherApi.js`
3. Install dependencies and run

## 📝 Usage

- Default city: Tel Aviv
- Search for any city and view its weather
- Add cities to favorites with the heart button
- Switch between weather and favorites pages
- Toggle theme and temperature units in the header

## 🎨 Design

- Clean, modern interface
- Smooth animations and transitions
- Emoji weather icons for visual appeal
- Mobile-first responsive design
