import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser } from '../redux/authActions';

function AuthForm({ loading, authError, handleLogin, handleRegister }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return false;
    }
    setLocalError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    if (isLoginView) {
      handleLogin(email, password).catch(() => {});
    } else {
      handleRegister(email, password).then(() => alert('Registration Successful! Logging in...')).catch(() => {});
    }
  };

  return (
    <div className="auth-box">
      <h2>{isLoginView ? 'Sign In' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {(localError || authError) && <p className="error-text">{localError || authError}</p>}

        <button type="submit" disabled={loading} className="btn-auth">
          {loading ? 'Processing...' : isLoginView ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="toggle-view-text" onClick={() => { setIsLoginView(!isLoginView); setLocalError(''); }}>
        {isLoginView ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authError: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email, password) => loginUser(email, password, dispatch),
  handleRegister: (email, password) => registerUser(email, password, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
