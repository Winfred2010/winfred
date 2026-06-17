import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from '../redux/actions';

const TodoList = ({ todos, onToggle, onRemove }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <li key={todo.id} style={{ margin: '10px 0' }}>
          <span
            onClick={() => onToggle(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              marginRight: '15px'
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => onRemove(todo.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

// Mapping the state to props
const mapStateToProps = (state) => ({
  todos: state.todos,
});

// Mapping dispatchers to props
const mapDispatchToProps = (dispatch) => ({
  onToggle: (id) => dispatch(toggleTodo(id)),
  onRemove: (id) => dispatch(removeTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);