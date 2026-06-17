import { TaskProvider } from './TaskProvider';
import AddTask from './AddTask';
import TaskList from './TaskList';

function TaskManager() {
  return (
    <TaskProvider>
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '2rem',
          display: 'grid',
          gap: '1.75rem',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <header>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Mini Task Manager</h1>
          <p style={{ color: '#4b5563', marginTop: 8 }}>
            Add tasks, mark them complete, and remove them using context and reducer.
          </p>
        </header>

        <section
          style={{
            display: 'grid',
            gap: 20,
            background: '#f8fafc',
            padding: '1.75rem',
            borderRadius: 24,
            border: '1px solid #e5e7eb',
          }}
        >
          <AddTask />
          <TaskList />
        </section>
      </div>
    </TaskProvider>
  );
}

export default TaskManager;
