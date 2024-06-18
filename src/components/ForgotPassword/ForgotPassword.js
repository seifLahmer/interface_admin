import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forgotpassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/admin/forgot-password', {
        email,
      });

      if (response.status === 200) {
        setMessage('Password reset link sent to your email');
      } else {
        setMessage('Failed to send password reset link');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('Error during password reset');
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <p>{message}</p>
        <button onClick={handleBackToLogin} className="back-to-login-button">
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
