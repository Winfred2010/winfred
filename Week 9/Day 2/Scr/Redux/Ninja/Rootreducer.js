import { 
  AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, 
  ADD_CATEGORY, ADD_TODO, TOGGLE_TODO, REMOVE_TODO 
} from './actionTypes';

const initialAuthState = {
  token: localStorage.getItem('authToken') || null,
  user: JSON.parse(localStorage.getItem('authUser')) || null,
  loading: false,
  error: null
};

const initialTodoState = {
  categories: [
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' }
  ],
  todos: {
    '1': [{ id: '101', text: 'Review Authentication Flow', completed: false }],
    '2': [{ id: '201', text: 'Go for a run', completed: true }]
  }
};

const initialState = {
  auth: initialAuthState,
  todoData: initialTodoState
};

export default function rootReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // --- Auth Sub-State Handling ---
    case AUTH_START:
      return { ...state, auth: { ...state.auth, loading: true, error: null } };
    case AUTH_SUCCESS:
      return { ...state, auth: { token: payload.token, user: payload.user, loading: false, error: null } };
    case AUTH_FAIL:
      return { ...state, auth: { ...state.auth, loading: false, error: payload } };
    case AUTH_LOGOUT:
      return { ...state, auth: { token: null, user: null, loading: false, error: null } };

    // --- Todo Sub-State Handling ---
    case ADD_CATEGORY:
      return {
        ...state,
        todoData: {
          categories: [...state.todoData.categories, payload],
          todos: { ...state.todoData.todos, [payload.id]: [] }
        }
      };
    case ADD_TODO:
      if (!state.todoData.todos[payload.categoryId]) return state;
      return {
        ...state,
        todoData: {
          ...state.todoData,
          todos: {
            ...state.todoData.todos,
            [payload.categoryId]: [
              ...state.todoData.todos[payload.categoryId],
              { id: payload.id, text: payload.text, completed: false }
            ]
          }
        }
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todoData: {
          ...state.todoData,
          todos: {
            ...state.todoData.todos,
            [payload.categoryId]: state.todoData.todos[payload.categoryId].map(todo =>
              todo.id === payload.todoId ? { ...todo, completed: !todo.completed } : todo
            )
          }
        }
      };
    case REMOVE_TODO:
      return {
        ...state,
        todoData: {
          ...state.todoData,
          todos: {
            ...state.todoData.todos,
            [payload.categoryId]: state.todoData.todos[payload.categoryId].filter(todo => todo.id !== payload.todoId)
          }
        }
      };
    default:
      return state;
  }
}
