import React, { useState, useRef } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskItem({ task }) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef(null);

  const handleSave = () => {
    const updatedText = editInputRef.current.value.trim();
    if (updatedText) {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, text: updatedText } });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setIsEditing(false);
  };

  return (
    <li className="task-item">
      <div className="task-item-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
        />
        
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            defaultValue={task.text}
            onKeyDown={handleKeyDown}
            autoFocus
            className="edit-input"
          />
        ) : (
          <span 
            onClick={() => setIsEditing(true)}
            className={`task-text ${task.completed ? 'completed' : ''}`}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="task-item-actions">
        {isEditing ? (
          <button onClick={handleSave} className="btn-save">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
        )}
        <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })} className="btn-delete">
          Delete
        </button>
      </div>
    </li>
  );
}
