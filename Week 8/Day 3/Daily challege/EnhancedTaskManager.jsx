import { TaskProvider } from './TaskProvider';
import AddTask from './AddTask';
import FilterTabs from './FilterTabs';
import TaskList from './TaskList';

function EnhancedTaskManager() {
  return (
    <TaskProvider>
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '32px 20px',
          fontFamily: 'Inter, system-ui, sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: 20,
            padding: '32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          }}
        >
          <header style={{ marginBottom: 32 }}>
            <h1 style={{ margin: 0, fontSize: '2.2rem', color: '#111827' }}>
              📋 Task Manager Pro
            </h1>
            <p style={{ color: '#6b7280', marginTop: 8, fontSize: '1rem' }}>
              Add, edit, and filter your tasks. Stay organized and productive.
            </p>
          </header>

          <AddTask />

          <FilterTabs />

          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default EnhancedTaskManager;
