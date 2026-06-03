import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './redux/rootReducer';
import { authLogout } from './redux/authActions';
import AuthForm from './components/AuthForm';
import CategoryForm from './components/CategoryForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Protected Core Layout Shell
function Dashboard({ user, isAuthenticated, logout }) {
  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="user-badge">Logged in as: <strong>{user?.email}</strong></span>
        <button onClick={logout} className="btn-logout">Logout</button>
      </header>
      
      <h1 className="app-heading">Secure Dashboard Task Manager</h1>
      
      <div className="control-panel">
        <CategoryForm />
        <TodoForm />
      </div>
      
      <TodoList />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authLogout())
});

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedDashboard />
    </Provider>
  );
}
