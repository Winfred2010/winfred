import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskFilterButtons from './components/TaskFilterButtons';
import TaskList from './components/TaskList';
import './index.css';

export default function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <h2>Enhanced Task Manager</h2>
        <TaskForm />
        <TaskFilterButtons />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
