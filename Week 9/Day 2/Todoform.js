import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions';

const TodoForm = ({ dispatchAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatchAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

// Connecting the action dispatcher to props
const mapDispatchToProps = (dispatch) => ({
  dispatchAddTodo: (text) => dispatch(addTodo(text)),
});

// Exporting the connected component
export default connect(null, mapDispatchToProps)(TodoForm);