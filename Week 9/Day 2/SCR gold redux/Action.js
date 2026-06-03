import { ADD_CATEGORY, ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes';

export const addCategory = (name) => ({
  type: ADD_CATEGORY,
  payload: { id: Date.now().toString(), name },
});

export const addTodo = (categoryId, text) => ({
  type: ADD_TODO,
  payload: { categoryId, id: Date.now().toString(), text },
});

export const toggleTodo = (categoryId, todoId) => ({
  type: TOGGLE_TODO,
  payload: { categoryId, todoId },
});

export const removeTodo = (categoryId, todoId) => ({
  type: REMOVE_TODO,
  payload: { categoryId, todoId },
});
