# Snap Shot Mini Project

A React gallery app built with React Router, live image search, categories, and pagination.

## Features
- Four category pages (`Mountain`, `Beaches`, `Birds`, `Food`)
- Search page with typed query support
- 30 images loaded for every category or search
- Image hover transitions for a polished gallery experience
- Pagination controls for browsing additional pages
- Pexels API integration with fallback images when no API key is set

## Files
- `index.jsx` — application entry point
- `App.jsx` — route setup and page layout
- `components/` — reusable UI components
- `services/pexelsApi.js` — API and fallback image loader
- `styles.css` — page styling and hover effects

## Setup
1. Add a Pexels API key in `.env` or your environment:
   ```env
   REACT_APP_PEXELS_API_KEY=your_own_pexels_key_here
   ```
2. Install React dependencies in your project environment.
3. Run the app with your React build tool.

> If the Pexels key is missing or the API request fails, the app automatically uses built-in fallback photos.
