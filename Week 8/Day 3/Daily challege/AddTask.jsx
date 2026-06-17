import { useState } from 'react';
import { useTask } from './useTask';

function AddTask() {
  const [text, setText] = useState('');
  const { dispatch } = useTask();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: trimmed,
    };

    dispatch({ type: 'add', payload: newTask });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
      <label htmlFor="task-input" style={{ fontWeight: 600, fontSize: '1rem' }}>
        Add a New Task
      </label>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          id="task-input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What needs to be done?"
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid #d1d5db',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
          onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
        />
        <button
          type="submit"
          style={{
            background: '#2563eb',
            border: 'none',
            color: '#ffffff',
            borderRadius: 10,
            padding: '12px 20px',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.background = '#1d4ed8')}
          onMouseLeave={(e) => (e.target.style.background = '#2563eb')}
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTask;
