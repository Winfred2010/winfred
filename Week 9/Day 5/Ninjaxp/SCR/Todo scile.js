import { createSlice, createSelector } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'All',
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;

const selectRawTodos = (state) => state.todos.items;
export const selectVisibilityFilter = (state) => state.todos.filter;

export const selectFilteredTodos = createSelector(
  [selectRawTodos, selectVisibilityFilter],
  (todos, filter) => {
    if (filter === 'Active') return todos.filter((t) => !t.completed);
    if (filter === 'Completed') return todos.filter((t) => t.completed);
    return todos;
  }
);

export const selectFilteredTodosCount = createSelector(
  [selectFilteredTodos],
  (filteredTodos) => filteredTodos.length
);
