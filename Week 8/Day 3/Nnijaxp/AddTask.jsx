import { useContext, useState } from 'react';
import TaskContext from './TaskContext';

function AddTask() {
  const [text, setText] = useState('');
  const { dispatch } = useContext(TaskContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: trimmed,
      completed: false,
    };

    dispatch({ type: 'add', payload: newTask });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
      <label htmlFor="new-task" style={{ fontWeight: 600 }}>
        New Task
      </label>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          id="new-task"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Describe the task"
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
            background: '#2563eb',
            border: 'none',
            color: '#ffffff',
            borderRadius: 12,
            padding: '0.9rem 1.2rem',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTask;
