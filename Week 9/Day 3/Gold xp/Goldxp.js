import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Redux Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Stores user info directly
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { loginUser, logoutUser } = authSlice.actions;

// 2. Redux Store
const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

// 3. Components
function Login() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    dispatch(loginUser({ name: username.trim() }));
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        placeholder="Enter username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button type="submit">Log In</button>
    </form>
  );
}

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <p>This is your premium dashboard content.</p>
      <button onClick={() => dispatch(logoutUser())}>Log Out</button>
    </div>
  );
}

function MainApp() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Conditional rendering based on auth status
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>App Authentication</h1>
      {isLoggedIn ? <Dashboard /> : <Login />}
    </div>
  );
}

// 4. Root Wrapper
export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
