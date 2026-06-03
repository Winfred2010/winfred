import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoReducer from './redux/reducer';
import CategoryForm from './components/CategoryForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

// Supports native Redux DevTools Extension orchestration
const store = createStore(
  todoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  return (
    <Provider store={store}>
      <div className="app-layout">
        <h1 className="app-heading">Categorized Master Todo List</h1>
        <div className="control-panel">
          <CategoryForm />
          <TodoForm />
        </div>
        <TodoList />
      </div>
    </Provider>
  );
}
