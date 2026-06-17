import React, { useState, useCallback } from 'react';
import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Redux Slice
const trackerSlice = createSlice({
  name: 'tracker',
  initialState: {
    selectedCategoryId: '1',
    categories: [
      { id: '1', name: 'Work' },
      { id: '2', name: 'Personal' }
    ],
    tasks: [
      { id: '101', categoryId: '1', text: 'Report layout', completed: false },
      { id: '102', categoryId: '2', text: 'Buy groceries', completed: true }
    ]
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    editTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) task.text = action.payload.text;
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    }
  }
});

const { setCategory, editTask, toggleTask } = trackerSlice.actions;

// 2. Selectors
const selectAllTasks = (state) => state.tracker.tasks;
const selectAllCategories = (state) => state.tracker.categories;
const selectCurrentCategoryId = (state) => state.tracker.selectedCategoryId;

export const selectTasksByCategory = createSelector(
  [selectAllTasks, selectCurrentCategoryId],
  (tasks, categoryId) => tasks.filter(t => t.categoryId === categoryId)
);

export const selectCompletedTasksCount = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter(t => t.completed).length
);

// 3. Store Configuration
const store = configureStore({
  reducer: { tracker: trackerSlice.reducer }
});

// 4. Components
function CategorySelector() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const currentId = useSelector(selectCurrentCategoryId);

  return (
    <select value={currentId} onChange={(e) => dispatch(setCategory(e.target.value))}>
      {categories.map(c => (
        <option key={c.id} value={c.id}>{c.name}</option>
      ))}
    </select>
  );
}

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksByCategory);
  const completedCount = useSelector(selectCompletedTasksCount);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleToggle = useCallback((id) => dispatch(toggleTask(id)), [dispatch]);
  
  const handleSave = useCallback((id) => {
    if (!editText.trim()) return;
    dispatch(editTask({ id, text: editText.trim() }));
    setEditingId(null);
  }, [dispatch, editText]);

  return (
    <div>
      <p>Global Completed Count: {completedCount}</p>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleToggle(task.id)} 
            />
            {editingId === task.id ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={() => handleSave(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
                <button onClick={() => { setEditingId(task.id); setEditText(task.text); }}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. Root Entry
export default function App() {
  return (
    <Provider store={store}>
      <h1>Productivity Tracker</h1>
      <CategorySelector />
      <TaskList />
    </Provider>
  );
}
