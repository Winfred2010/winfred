import { BookCard } from './BookCard';
import { useBooks } from '../hooks/useBooks';
import { Search, Filter, ArrowUpDown, BookX } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useState } from 'react';
import type { BookFilter, SortField, SortDirection } from '../model/Book';
import './BookList.css';

export const BookList = () => {
  const {
    books,
    filter,
    searchQuery,
    sortField,
    sortDirection,
    selectedCategory,
    categories,
    setFilter,
    setSearchQuery,
    setSort,
    setSelectedCategory,
  } = useBooks();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Update Redux when debounced value changes
  useState(() => {
    setSearchQuery(debouncedSearch);
  });

  // Sync local search with debounced
  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    setSearchQuery(value);
  };

  const handleSort = (field: SortField) => {
    const direction: SortDirection =
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSort(field, direction);
  };

  const filters: { value: BookFilter; label: string }[] = [
    { value: 'all', label: 'All Books' },
    { value: 'read', label: 'Read' },
    { value: 'unread', label: 'Unread' },
  ];

  const sortOptions: { field: SortField; label: string }[] = [
    { field: 'dateAdded', label: 'Date Added' },
    { field: 'title', label: 'Title' },
    { field: 'author', label: 'Author' },
    { field: 'rating', label: 'Rating' },
  ];

  return (
    <div className="book-list-container">
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search books..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <Filter size={16} />
          <div className="filter-tabs">
            {filters.map((f) => (
              <button
                key={f.value}
                className={`filter-tab ${filter === f.value ? 'active' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-controls">
          <ArrowUpDown size={16} />
          {sortOptions.map((opt) => (
            <button
              key={opt.field}
              className={`sort-btn ${sortField === opt.field ? 'active' : ''}`}
              onClick={() => handleSort(opt.field)}
            >
              {opt.label}
              {sortField === opt.field && (
                <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <BookX size={48} />
          <p>No books found</p>
          <span>Try adjusting your filters or add a new book</span>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
