import { useTask } from './useTask';
import TaskItem from './TaskItem';

function TaskList() {
  const { state } = useTask();
  const { tasks, filter } = state;

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'active':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
        <p>No tasks yet. Add one above to get started!</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
        <p>No tasks match the current filter.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 600 }}>
        Tasks ({filteredTasks.length})
      </h3>
      <div>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
