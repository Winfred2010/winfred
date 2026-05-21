import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { state } = useTasks();

  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === 'ACTIVE') return !task.completed;
    if (state.filter === 'COMPLETED') return task.completed;
    return true; 
  });

  if (filteredTasks.length === 0) {
    return <p className="empty-message">No tasks found.</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
