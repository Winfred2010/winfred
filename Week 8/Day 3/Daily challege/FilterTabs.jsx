import { useTask } from './useTask';

function FilterTabs() {
  const { state, dispatch } = useTask();
  const { tasks, filter } = state;

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  const handleFilter = (filterType) => {
    dispatch({ type: 'filter', payload: filterType });
  };

  const buttonStyle = (isActive) => ({
    padding: '10px 16px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    background: isActive ? '#2563eb' : '#e5e7eb',
    color: isActive ? '#ffffff' : '#374151',
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
        flexWrap: 'wrap',
      }}
    >
      <button
        type="button"
        onClick={() => handleFilter('all')}
        style={buttonStyle(filter === 'all')}
      >
        All ({tasks.length})
      </button>

      <button
        type="button"
        onClick={() => handleFilter('active')}
        style={buttonStyle(filter === 'active')}
      >
        Active ({activeCount})
      </button>

      <button
        type="button"
        onClick={() => handleFilter('completed')}
        style={buttonStyle(filter === 'completed')}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
}

export default FilterTabs;
