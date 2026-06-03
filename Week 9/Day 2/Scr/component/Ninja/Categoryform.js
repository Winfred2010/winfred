import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ADD_CATEGORY } from '../redux/actionTypes';

function CategoryForm({ dispatchAddCategory }) {
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatchAddCategory(name.trim());
    setName('');
  };
  return (
    <form onSubmit={handleSubmit} className="category-form">
      <input type="text" placeholder="Create new category..." value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
      <button type="submit" className="btn-primary">Add Category</button>
    </form>
  );
}
const mapDispatchToProps = (dispatch) => ({
  dispatchAddCategory: (name) => dispatch({ type: ADD_CATEGORY, payload: { id: Date.now().toString(), name } })
});
export default connect(null, mapDispatchToProps)(CategoryForm);
