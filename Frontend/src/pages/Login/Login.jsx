import React, { useState } from 'react';
import './Login.css';
import Logo from '../../assets/logo/logo.png';
import { useNavigate } from 'react-router-dom';
import Register from '../../components/Register/Register.jsx';

const API_BASE = 'https://harmonize-app-backend.vercel.app';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://harmonize-app-backend.vercel.app/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
  
      const data = await response.json();
      
      // Store user data and token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to dashboard
      navigate('/');
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-image" />
        </div>
        <div className="login-container">
          {error && <div className="error-message">{error}</div>}
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
            <button 
              type="submit" 
              className='login-button' 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <button className='forgot-password-button'>Forgot password?</button>
          <div className='separator'>
            <span>New to Harmonize?</span>
          </div>
          <button 
            className='register-button' 
            onClick={() => setIsRegisterOpen(true)}
          >
            Create account
          </button>
        </div>
      </div>
      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
};

export default Login;