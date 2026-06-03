import React, { useState } from 'react';
import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';

// 1. Redux Slice & Mock Data
const bookSlice = createSlice({
  name: 'books',
  initialState: {
    list: [
      { id: 1, title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
      { id: 2, title: 'Dracula', author: 'Bram Stoker', genre: 'Horror' },
      { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
      { id: 4, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' }
    ]
  },
  reducers: {}
});

// 2. Performance Optimized Memoized Selectors
const selectAllBooks = (state) => state.books.list;

export const selectHorrorBooks = createSelector(
  [selectAllBooks],
  (books) => books.filter((b) => b.genre === 'Horror')
);

export const selectFantasyBooks = createSelector(
  [selectAllBooks],
  (books) => books.filter((b) => b.genre === 'Fantasy')
);

export const selectSciFiBooks = createSelector(
  [selectAllBooks],
  (books) => books.filter((b) => b.genre === 'Science Fiction')
);

// 3. Redux Store Configuration
const store = configureStore({
  reducer: { books: bookSlice.reducer }
});

// 4. React Components
function BookList() {
  const [genre, setGenre] = useState('All');

  // Dynamic selector selection based on state
  const books = useSelector((state) => {
    if (genre === 'Horror') return selectHorrorBooks(state);
    if (genre === 'Fantasy') return selectFantasyBooks(state);
    if (genre === 'SciFi') return selectSciFiBooks(state);
    return selectAllBooks(state);
  });

  return (
    <div>
      <div>
        <button onClick={() => setGenre('All')}>All</button>
        <button onClick={() => setGenre('Horror')}>Horror</button>
        <button onClick={() => setGenre('Fantasy')}>Fantasy</button>
        <button onClick={() => setGenre('SciFi')}>Sci-Fi</button>
      </div>

      <h3>{genre} Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} ({book.genre})
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. Application Root Entry
export default function App() {
  return (
    <Provider store={store}>
      <h1>Book Inventory</h1>
      <BookList />
    </Provider>
  );
}
