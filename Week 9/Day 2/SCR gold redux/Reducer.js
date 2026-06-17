import { ADD_CATEGORY, ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes';

const initialState = {
  categories: [
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' }
  ],
  todos: {
    '1': [
      { id: '101', text: 'Review Code PRs', completed: false },
    ],
    '2': [
      { id: '201', text: 'Buy groceries', completed: true },
    ]
  }
};

export default function todoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        todos: { ...state.todos, [payload.id]: [] }
      };

    case ADD_TODO:
      // Error handling guard clause
      if (!state.todos[payload.categoryId]) return state; 
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.categoryId]: [
            ...state.todos[payload.categoryId],
            { id: payload.id, text: payload.text, completed: false }
          ]
        }
      };

    case TOGGLE_TODO:
      if (!state.todos[payload.categoryId]) return state;
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.categoryId]: state.todos[payload.categoryId].map(todo =>
            todo.id === payload.todoId ? { ...todo, completed: !todo.completed } : todo
          )
        }
      };

    case REMOVE_TODO:
      if (!state.todos[payload.categoryId]) return state;
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.categoryId]: state.todos[payload.categoryId].filter(
            todo => todo.id !== payload.todoId
          )
        }
      };

    default:
      return state;
  }
}
