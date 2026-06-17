import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  selectFilteredTodos,
  selectVisibilityFilter,
  selectFilteredTodosCount,
} from '../store/todoSlice';

export default function TodoList() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const todos = useSelector(selectFilteredTodos);
  const activeFilter = useSelector(selectVisibilityFilter);
  const count = useSelector(selectFilteredTodosCount);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText('');
  };

  const handleToggle = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const handleRemove = useCallback((id) => {
    dispatch(removeTodo(id));
  }, [dispatch]);

  return (
    <div className="todo-container">
      <h2>Todo Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task..."
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="filter-actions">
        {['All', 'Active', 'Completed'].map((type) => (
          <button
            key={type}
            onClick={() => dispatch(setFilter(type))}
            className={activeFilter === type ? 'active' : ''}
          >
            {type}
          </button>
        ))}
      </div>

      <p className="summary-count">
        Showing {count} {activeFilter.toLowerCase()} tasks
      </p>

      <ul className="todo-list">
        {todos.map(({ id, text, completed }) => (
          <li key={id} className={completed ? 'done' : ''}>
            <span onClick={() => handleToggle(id)}>{text}</span>
            <button onClick={() => handleRemove(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
