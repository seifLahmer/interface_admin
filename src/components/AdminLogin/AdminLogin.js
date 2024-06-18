import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

function AdminLogin({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/admin/login', {
        username,
        mdp: password,
      });

      if (response.status === 200) {
        setMessage('Login successful');
        setLoggedIn(true);
        navigate('/employees');
      } else {
        setMessage('Login failed');
        setLoggedIn(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error during login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
        
      </div>
    </div>
  );
}

export default AdminLogin;
