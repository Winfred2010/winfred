import { useContext } from 'react';
import TaskContext from './TaskContext';

function TaskList() {
  const { tasks, dispatch } = useContext(TaskContext);

  if (tasks.length === 0) {
    return <p style={{ color: '#6b7280' }}>No tasks yet. Add one to get started.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
          }}
        >
          <button
            type="button"
            onClick={() => dispatch({ type: 'toggle', payload: { id: task.id } })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: task.completed ? '#10b981' : '#111827',
              textAlign: 'left',
              width: '100%',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '2px solid #2563eb',
                background: task.completed ? '#2563eb' : 'transparent',
              }}
            />
            <span style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#6b7280' : '#111827',
            }}>
              {task.text}
            </span>
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'remove', payload: { id: task.id } })}
            style={{
              border: 'none',
              background: '#ef4444',
              color: '#ffffff',
              borderRadius: 999,
              padding: '0.65rem 0.9rem',
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
