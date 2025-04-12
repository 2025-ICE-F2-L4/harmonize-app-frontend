import React, { useState } from 'react';
import './Login.css';
import  Logo  from '../../assets/logo/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
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