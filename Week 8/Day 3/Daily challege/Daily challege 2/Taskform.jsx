import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { taskReducer, initialState, ACTIONS } from './taskReducer';

const TaskContext = createContext(null);
const LOCAL_STORAGE_KEY = 'enhanced_task_manager_items';

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const isInitialMount = useRef(true);

  // Effect 1: Initial hydration from local storage on mount
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        dispatch({ type: ACTIONS.LOAD_TASKS, payload: JSON.parse(storedTasks) });
      }
    } catch (error) {
      console.error('Failed parsing tasks from localStorage:', error);
    }
    isInitialMount.current = false;
  }, []);

  // Effect 2: Save sync back to disk on task mutations
  useEffect(() => {
    if (isInitialMount.current) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.tasks));
    } catch (error) {
      console.error('Failed saving tasks to localStorage:', error);
    }
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
