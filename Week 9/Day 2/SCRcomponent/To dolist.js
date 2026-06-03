import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from '../redux/actions';

function TodoList({ categories, todosByCat, dispatchToggle, dispatchRemove }) {
  return (
    <div className="todo-list-container">
      {categories.map((category) => {
        const currentTodos = todosByCat[category.id] || [];
        
        return (
          <div key={category.id} className="category-section">
            <h3 className="category-title">{category.name}</h3>
            <ul className="todo-items-list">
              {currentTodos.length === 0 ? (
                <li className="empty-state">No tasks in this category.</li>
              ) : (
                currentTodos.map((todo) => (
                  <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <span 
                      onClick={() => dispatchToggle(category.id, todo.id)}
                      className="todo-text"
                    >
                      {todo.text}
                    </span>
                    <button 
                      onClick={() => dispatchRemove(category.id, todo.id)}
                      className="btn-danger"
                    >
                      Remove
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  todosByCat: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToggle: (catId, todoId) => dispatch(toggleTodo(catId, todoId)),
  dispatchRemove: (catId, todoId) => dispatch(removeTodo(catId, todoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
