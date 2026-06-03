import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from './actionTypes';

// --- Action Creators ---
export const authStart = () => ({ type: AUTH_START });
export const authLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
  return { type: AUTH_LOGOUT };
};
export const authSuccess = (user, token) => ({
  type: AUTH_SUCCESS,
  payload: { user, token }
});
export const authFail = (error) => ({
  type: AUTH_FAIL,
  payload: error
});

// --- Mock API Side-Effect Functions (Manual Thunk Simulation) ---
export const registerUser = (email, password, dispatch) => {
  dispatch(authStart());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('mock_db_users') || '[]');
      if (users.find(u => u.email === email)) {
        dispatch(authFail('User already exists!'));
        return reject('User already exists!');
      }
      
      const newUser = { id: Date.now().toString(), email, password };
      users.push(newUser);
      localStorage.setItem('mock_db_users', JSON.stringify(users));
      
      const token = `mock-jwt-token-${newUser.id}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(newUser));
      
      dispatch(authSuccess(newUser, token));
      resolve();
    }, 800);
  });
};

export const loginUser = (email, password, dispatch) => {
  dispatch(authStart());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('mock_db_users') || '[]');
      const matchedUser = users.find(u => u.email === email && u.password === password);
      
      if (!matchedUser) {
        dispatch(authFail('Invalid email or password!'));
        return reject('Invalid email or password!');
      }
      
      const token = `mock-jwt-token-${matchedUser.id}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(matchedUser));
      
      dispatch(authSuccess(matchedUser, token));
      resolve();
    }, 800);
  });
};
