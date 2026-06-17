import React from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskFilterButtons() {
  const { state, dispatch } = useTasks();
  const filters = ['ALL', 'ACTIVE', 'COMPLETED'];

  return (
    <div className="filter-container">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
          className={`btn-filter ${state.filter === f ? 'active' : ''}`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
