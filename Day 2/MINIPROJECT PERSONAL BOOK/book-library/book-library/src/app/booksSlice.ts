import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { BookItem, type Book, type BookFilter, type SortField, type SortDirection } from '../model/Book';

interface BooksState {
  items: BookItem[];
  filter: BookFilter;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  selectedCategory: string;
  categories: string[];
}

const loadFromStorage = (): BookItem[] => {
  try {
    const data = localStorage.getItem('book-library-data');
    if (data) {
      const parsed: Book[] = JSON.parse(data);
      return parsed.map((b) => BookItem.fromJSON(b));
    }
  } catch {
    // ignore parse errors
  }
  return [
    new BookItem({
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel set in the Jazz Age that tells the story of Jay Gatsby.',
      category: 'Classic Fiction',
      isRead: true,
      rating: 5,
      dateAdded: new Date(Date.now() - 86400000 * 30).toISOString(),
    }),
    new BookItem({
      id: '2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: 'A handbook of agile software craftsmanship.',
      category: 'Technology',
      isRead: false,
      rating: 0,
      dateAdded: new Date(Date.now() - 86400000 * 15).toISOString(),
    }),
    new BookItem({
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'An easy and proven way to build good habits.',
      category: 'Self-Help',
      isRead: false,
      rating: 0,
      dateAdded: new Date(Date.now() - 86400000 * 7).toISOString(),
    }),
  ];
};

const initialState: BooksState = {
  items: loadFromStorage(),
  filter: 'all',
  searchQuery: '',
  sortField: 'dateAdded',
  sortDirection: 'desc',
  selectedCategory: 'All',
  categories: ['Classic Fiction', 'Technology', 'Self-Help', 'Science Fiction', 'Biography'],
};

const saveToStorage = (items: BookItem[]) => {
  localStorage.setItem('book-library-data', JSON.stringify(items.map((i) => i.toJSON())));
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'id' | 'dateAdded'>>) => {
      const newBook = BookItem.create(action.payload);
      state.items.push(newBook);
      saveToStorage(state.items);
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((book) => book.id !== action.payload);
      saveToStorage(state.items);
    },
    toggleReadStatus: (state, action: PayloadAction<string>) => {
      const book = state.items.find((b) => b.id === action.payload);
      if (book) {
        book.isRead = !book.isRead;
        saveToStorage(state.items);
      }
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.items.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = BookItem.fromJSON(action.payload);
        saveToStorage(state.items);
      }
    },
    setFilter: (state, action: PayloadAction<BookFilter>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSort: (state, action: PayloadAction<{ field: SortField; direction: SortDirection }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      const cat = action.payload.trim();
      if (cat && !state.categories.includes(cat)) {
        state.categories.push(cat);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((c) => c !== action.payload);
      state.items = state.items.map((book) =>
        book.category === action.payload ? { ...book, category: 'Uncategorized' } : book
      );
      saveToStorage(state.items);
    },
    importBooks: (state, action: PayloadAction<Book[]>) => {
      state.items = action.payload.map((b) => BookItem.fromJSON(b));
      saveToStorage(state.items);
    },
    setRating: (state, action: PayloadAction<{ id: string; rating: number }>) => {
      const book = state.items.find((b) => b.id === action.payload.id);
      if (book) {
        book.rating = Math.max(0, Math.min(5, action.payload.rating));
        saveToStorage(state.items);
      }
    },
  },
});

export const {
  addBook,
  removeBook,
  toggleReadStatus,
  updateBook,
  setFilter,
  setSearchQuery,
  setSort,
  setSelectedCategory,
  addCategory,
  removeCategory,
  importBooks,
  setRating,
} = booksSlice.actions;

export default booksSlice.reducer;
