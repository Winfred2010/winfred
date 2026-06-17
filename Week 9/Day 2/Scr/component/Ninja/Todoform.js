import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ADD_TODO } from '../redux/actionTypes';

function TodoForm({ categories, dispatchAddTodo }) {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedCategory) return;
    dispatchAddTodo(selectedCategory, text.trim());
    setText('');
  };

  if (categories.length === 0) return null;

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input type="text" placeholder="What needs to be done?" value={text} onChange={(e) => setText(e.target.value)} className="input-field" />
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="select-field">
        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </select>
      <button type="submit" className="btn-success">Add Task</button>
    </form>
  );
}
const mapStateToProps = (state) => ({ categories: state.todoData.categories });
const mapDispatchToProps = (dispatch) => ({
  dispatchAddTodo: (catId, text) => dispatch({ type: ADD_TODO, payload: { categoryId: catId, id: Date.now().toString(), text } })
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
