import { useState, useRef } from 'react';
import { useTask } from './useTask';

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);
  const { dispatch } = useTask();

  const handleToggle = () => {
    dispatch({ type: 'toggle', payload: { id: task.id } });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      dispatch({
        type: 'edit',
        payload: { id: task.id, text: trimmed },
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'remove', payload: { id: task.id } });
  };

  if (isEditing) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          borderRadius: 12,
          background: '#fffbeb',
          border: '2px solid #fbbf24',
          marginBottom: 12,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #fbbf24',
            outline: 'none',
            fontSize: '1rem',
          }}
        />
        <button
          type="button"
          onClick={handleSave}
          style={{
            background: '#10b981',
            border: 'none',
            color: '#ffffff',
            borderRadius: 8,
            padding: '8px 12px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            background: '#6b7280',
            border: 'none',
            color: '#ffffff',
            borderRadius: 8,
            padding: '8px 12px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        background: '#ffffff',
        marginBottom: 12,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s',
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flex: 1,
          textAlign: 'left',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: task.completed ? 'none' : '2px solid #2563eb',
            background: task.completed ? '#10b981' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          {task.completed ? '✓' : ''}
        </span>
        <span
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#9ca3af' : '#111827',
            fontSize: '1rem',
          }}
        >
          {task.text}
        </span>
      </button>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={handleEdit}
          style={{
            background: '#3b82f6',
            border: 'none',
            color: '#ffffff',
            borderRadius: 8,
            padding: '6px 10px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleRemove}
          style={{
            background: '#ef4444',
            border: 'none',
            color: '#ffffff',
            borderRadius: 8,
            padding: '6px 10px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
