import { ADD_TASK, EDIT_TASK, DELETE_TASK, SELECT_DAY } from './actionTypes';

// Helper function to safely read cached planner information
const loadSavedPlanner = () => {
  try {
    const saved = localStorage.getItem('planner_tasks');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

// Returns today's date formatted as YYYY-MM-DD in local time
const getLocalTodayString = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
};

const initialState = {
  selectedDay: getLocalTodayString(),
  // Structured as: { "2026-05-21": [{ id: "1", text: "Meeting" }] }
  dailyTasks: loadSavedPlanner(),
};

export default function plannerReducer(state = initialState, action) {
  let updatedDailyTasks;

  switch (action.type) {
    case SELECT_DAY:
      return {
        ...state,
        selectedDay: action.payload,
      };

    case ADD_TASK: {
      const { dayKey, id, text } = action.payload;
      const dayList = state.dailyTasks[dayKey] || [];
      
      updatedDailyTasks = {
        ...state.dailyTasks,
        [dayKey]: [...dayList, { id, text }],
      };
      break;
    }

    case EDIT_TASK: {
      const { dayKey, taskId, newText } = action.payload;
      if (!state.dailyTasks[dayKey]) return state;

      updatedDailyTasks = {
        ...state.dailyTasks,
        [dayKey]: state.dailyTasks[dayKey].map((task) =>
          task.id === taskId ? { ...task, text: newText } : task
        ),
      };
      break;
    }

    case DELETE_TASK: {
      const { dayKey, taskId } = action.payload;
      if (!state.dailyTasks[dayKey]) return state;

      updatedDailyTasks = {
        ...state.dailyTasks,
        [dayKey]: state.dailyTasks[dayKey].filter((task) => task.id !== taskId),
      };
      break;
    }

    default:
      return state;
  }

  // Persist state mutations to cache storage
  if (updatedDailyTasks) {
    localStorage.setItem('planner_tasks', JSON.stringify(updatedDailyTasks));
    return { ...state, dailyTasks: updatedDailyTasks };
  }

  return state;
}
