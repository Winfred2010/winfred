import { useReducer, useRef, useState } from 'react';

const initialTodos = [];

function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: action.payload.id, text: action.payload.text }];
    case 'remove':
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
}

function TodoItem({ todo, onRemove }) {
  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.85rem 1rem',
        borderRadius: 14,
        background: '#f3f4f6',
        marginBottom: 8,
      }}
    >
      <span>{todo.text}</span>
      <button
        type="button"
        onClick={() => onRemove(todo.id)}
        style={{
          border: 'none',
          background: '#ef4444',
          color: '#ffffff',
          padding: '0.5rem 0.75rem',
          borderRadius: 999,
          cursor: 'pointer',
        }}
      >
        Remove
      </button>
    </li>
  );
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [text, setText] = useState('');
  const nextId = useRef(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    dispatch({
      type: 'add',
      payload: { id: nextId.current, text: trimmedText },
    });

    nextId.current += 1;
    setText('');
  };

  const handleRemove = (id) => {
    dispatch({ type: 'remove', payload: { id } });
  };

  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Todo List</h2>
        <p style={{ margin: '0.5rem 0 0', color: '#4b5563' }}>
          Add a task and remove it when you're done.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: '1rem' }}>
        <label htmlFor="todo-input" style={{ display: 'block', fontWeight: 600 }}>
          New todo
        </label>
        <div style={{ display: 'flex', gap: 12 }}>
          <input
            id="todo-input"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write your next task"
            style={{
              flex: 1,
              padding: '0.9rem 1rem',
              borderRadius: 12,
              border: '1px solid #d1d5db',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              border: 'none',
              borderRadius: 12,
              background: '#2563eb',
              color: '#ffffff',
              padding: '0.9rem 1.25rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Add
          </button>
        </div>
      </form>

      {todos.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No todos yet. Add one above to get started.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onRemove={handleRemove} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;