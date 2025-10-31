import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Toast from './Toast';
import LoadingSpinner from './LoadingSpinner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('All fields required');
      return;
    }
    setLoading(true);
    try {
      const { Token } = await login({ Username: username, Password: password });
      localStorage.setItem('token', Token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>Login</button>
      </form>
      {loading && <LoadingSpinner />}
      {error && <Toast message={error} type="error" />}
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;