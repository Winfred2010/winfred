import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Redux Slice
const plannerSlice = createSlice({
  name: 'planner',
  initialState: {
    selectedDate: new Date().toISOString().split('T')[0], // Defaults to today's date (YYYY-MM-DD)
    tasksByDate: {} // Format: { "2026-05-21": [{ id: 1, text: "Task" }] }
  },
  reducers: {
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addTask: (state, action) => {
      const date = state.selectedDate;
      if (!state.tasksByDate[date]) {
        state.tasksByDate[date] = [];
      }
      state.tasksByDate[date].push({
        id: Date.now(),
        text: action.payload
      });
    },
    editTask: (state, action) => {
      const date = state.selectedDate;
      const task = state.tasksByDate[date]?.find(t => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    },
    deleteTask: (state, action) => {
      const date = state.selectedDate;
      if (state.tasksByDate[date]) {
        state.tasksByDate[date] = state.tasksByDate[date].filter(t => t.id !== action.payload);
      }
    }
  }
});

const { setDate, addTask, editTask, deleteTask } = plannerSlice.actions;

// 2. Redux Store
const store = configureStore({
  reducer: { planner: plannerSlice.reducer }
});

// 3. Components
function DatePicker() {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Choose Date:</label>
      <input 
        type="date" 
        value={selectedDate} 
        onChange={(e) => dispatch(setDate(e.target.value))} 
      />
    </div>
  );
}

function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask(text.trim()));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="New planner task..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList() {
  const { selectedDate, tasksByDate } = useSelector((state) => state.planner);
  const dispatch = useDispatch();
  
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const currentTasks = tasksByDate[selectedDate] || [];

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;
    dispatch(editTask({ id, text: editText.trim() }));
    setEditingId(null);
  };

  if (currentTasks.length === 0) {
    return <p>No tasks planned for this date.</p>;
  }

  return (
    <ul>
      {currentTasks.map((task) => (
        <li key={task.id} style={{ marginBottom: '10px' }}>
          {editingId === task.id ? (
            <>
              <input 
                type="text" 
                value={editText} 
                onChange={(e) => setEditText(e.target.value)} 
              />
              <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ marginRight: '15px' }}>{task.text}</span>
              <button onClick={() => handleStartEdit(task)}>Edit</button>
              <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

// 4. Root Wrapper
export default function App() {
  return (
    <Provider store={store}>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Daily Planner</h1>
        <DatePicker />
        <AddTask />
        <TaskList />
      </div>
    </Provider>
  );
}
