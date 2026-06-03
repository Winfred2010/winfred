import React, { useState, useEffect } from 'react';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Asynchronous Thunk Action Creator
export const fetchTodos = createAsyncThunk('todos/fetchAll', async () => {
  const res = await fetch('https://typicode.com');
  return res.json();
});

// 2. Redux Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: { list: [] },
  reducers: {
    addTodo: (state, action) => {
      state.list.push({ id: Date.now(), title: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

// 3. Redux Store Configuration
const store = configureStore({
  reducer: { todos: todoSlice.reducer }
});

// 4. React Components
function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text.trim()));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo..." />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList() {
  const list = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <ul>
      {list.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

// 5. Root Entry
export default function App() {
  return (
    <Provider store={store}>
      <h1>Async Todo List</h1>
      <AddTodo />
      <TodoList />
    </Provider>
  );
}
