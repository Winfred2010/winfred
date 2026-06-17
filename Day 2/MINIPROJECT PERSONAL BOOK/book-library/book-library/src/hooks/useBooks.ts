import { useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  addBook,
  removeBook,
  toggleReadStatus,
  setFilter,
  setSearchQuery,
  setSort,
  setSelectedCategory,
  addCategory,
  removeCategory,
  importBooks,
  setRating,
} from '../app/booksSlice';
import type { Book, BookFilter, SortField, SortDirection } from '../model/Book';

export const useBooks = () => {
  const dispatch = useAppDispatch();
  const { items, filter, searchQuery, sortField, sortDirection, selectedCategory, categories } =
    useAppSelector((state) => state.books);

  const filteredBooks = useMemo(() => {
    let result = [...items];

    // Filter by read status
    if (filter === 'read') result = result.filter((b) => b.isRead);
    if (filter === 'unread') result = result.filter((b) => !b.isRead);

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((b) => b.category === selectedCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'author':
          comparison = a.author.localeCompare(b.author);
          break;
        case 'dateAdded':
          comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [items, filter, searchQuery, sortField, sortDirection, selectedCategory]);

  const stats = useMemo(() => {
    const total = items.length;
    const read = items.filter((b) => b.isRead).length;
    const unread = total - read;
    const byCategory = items.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const avgRating =
      total > 0
        ? items.reduce((sum, b) => sum + b.rating, 0) / items.filter((b) => b.rating > 0).length || 0
        : 0;

    return { total, read, unread, byCategory, avgRating };
  }, [items]);

  return {
    books: filteredBooks,
    allBooks: items,
    filter,
    searchQuery,
    sortField,
    sortDirection,
    selectedCategory,
    categories,
    stats,
    addBook: useCallback((book: Omit<Book, 'id' | 'dateAdded'>) => dispatch(addBook(book)), [dispatch]),
    removeBook: useCallback((id: string) => dispatch(removeBook(id)), [dispatch]),
    toggleReadStatus: useCallback((id: string) => dispatch(toggleReadStatus(id)), [dispatch]),
    setFilter: useCallback((f: BookFilter) => dispatch(setFilter(f)), [dispatch]),
    setSearchQuery: useCallback((q: string) => dispatch(setSearchQuery(q)), [dispatch]),
    setSort: useCallback(
      (field: SortField, direction: SortDirection) => dispatch(setSort({ field, direction })),
      [dispatch]
    ),
    setSelectedCategory: useCallback((c: string) => dispatch(setSelectedCategory(c)), [dispatch]),
    addCategory: useCallback((c: string) => dispatch(addCategory(c)), [dispatch]),
    removeCategory: useCallback((c: string) => dispatch(removeCategory(c)), [dispatch]),
    importBooks: useCallback((books: Book[]) => dispatch(importBooks(books)), [dispatch]),
    setRating: useCallback((id: string, rating: number) => dispatch(setRating({ id, rating })), [dispatch]),
  };
};
