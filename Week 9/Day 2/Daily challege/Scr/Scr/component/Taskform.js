import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../redux/actions';

function TaskForm({ selectedDay, dispatchAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) {
      setError('Task content description cannot remain empty!');
      return;
    }
    setError('');
    dispatchAddTask(selectedDay, taskText.trim());
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-row">
        <input
          type="text"
          placeholder="Plan a new task for this day..."
          value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value);
            if (e.target.value.trim()) setError('');
          }}
          className="input-field"
        />
        <button type="submit" className="btn-success">Schedule Task</button>
      </div>
      {error && <p className="error-hint">{error}</p>}
    </form>
  );
}

const mapStateToProps = (state) => ({
  selectedDay: state.selectedDay,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddTask: (dayKey, text) => dispatch(addTask(dayKey, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
