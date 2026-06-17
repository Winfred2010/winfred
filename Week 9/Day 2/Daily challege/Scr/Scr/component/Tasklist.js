import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editTask, deleteTask } from '../redux/actions';

function TaskList({ selectedDay, currentTasks, dispatchEdit, dispatchDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSave = (taskId) => {
    if (!editText.trim()) return;
    dispatchEdit(selectedDay, taskId, editText.trim());
    setEditingId(null);
  };

  return (
    <div className="task-list-wrapper">
      <h3 className="section-title">
        Schedule for: <span className="highlight-date">{selectedDay}</span>
      </h3>
      
      {currentTasks.length === 0 ? (
        <p className="empty-state">No agenda entries recorded for this date.</p>
      ) : (
        <ul className="planner-items-list">
          {currentTasks.map((task) => (
            <li key={task.id} className="planner-item">
              {editingId === task.id ? (
                <div className="edit-mode-container">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="input-field edit-input"
                  />
                  <button onClick={() => handleSave(task.id)} className="btn-save">Save</button>
                  <button onClick={() => setEditingId(null)} className="btn-cancel">Cancel</button>
                </div>
              ) : (
                <div className="view-mode-container">
                  <span className="task-content-text">{task.text}</span>
                  <div className="item-controls">
                    <button onClick={() => startEditing(task)} className="btn-edit">Edit</button>
                    <button onClick={() => dispatchDelete(selectedDay, task.id)} className="btn-danger">Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const dayKey = state.selectedDay;
  return {
    selectedDay: dayKey,
    currentTasks: state.dailyTasks[dayKey] || [],
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEdit: (dayKey, taskId, newText) => dispatch(editTask(dayKey, taskId, newText)),
  dispatchDelete: (dayKey, taskId) => dispatch(deleteTask(dayKey, taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
