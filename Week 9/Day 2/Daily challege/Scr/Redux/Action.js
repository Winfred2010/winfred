import { ADD_TASK, EDIT_TASK, DELETE_TASK, SELECT_DAY } from './actionTypes';

export const selectDay = (dateString) => ({
  type: SELECT_DAY,
  payload: dateString,
});

export const addTask = (dayKey, text) => ({
  type: ADD_TASK,
  payload: { dayKey, id: Date.now().toString(), text },
});

export const editTask = (dayKey, taskId, newText) => ({
  type: EDIT_TASK,
  payload: { dayKey, taskId, newText },
});

export const deleteTask = (dayKey, taskId) => ({
  type: DELETE_TASK,
  payload: { dayKey, taskId },
});
