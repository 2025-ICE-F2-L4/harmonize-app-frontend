import React, { useState } from 'react';
import './Login.css';
import  Logo  from '../../assets/logo/logo.png';


const API_BASE = 'http://localhost:5000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this if using cookies/sessions
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
    
    if (response.ok) {
      // Store the token (in localStorage or context)
      localStorage.setItem('token', data.token);
      // Store user data if needed
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect to dashboard or home page
      window.location.href = '/';
    } else {
      // Show error message to user
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Network error. Please try again.');
  }
};

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="logo">
          <img src= {Logo} alt="Logo" className="logo-image" />
        </div>
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="buttons">
              <button type="submit" className='login-button'> Login</button>
              <button className='forgot-password-button'> Forgot password?</button>
              <div className='separator'>
                <span>New to Harmonize?</span>
              </div>
              <button className='register-button'>Create account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;