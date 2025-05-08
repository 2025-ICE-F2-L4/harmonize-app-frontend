import React, { useState } from "react";
import './Register.css';

const API_BASE = 'https://harmonize-app-backend.vercel.app/';

const Register = ( { isOpen, onClose, children } ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');    
    
    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${API_BASE}api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Registration failed');
          }
    
          setMessage("Account created successfully!");
          setEmail('');
          setPassword('');
          setTimeout(onClose, 1500); // close popup after short delay
    
        } catch (error) {
          setMessage(error.message);
        }
      };
    

    

    return(
        <div className="popup-register">
            <div className="close-register">
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <div className="form-container">
                <form className="register-form">
                <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-register">Create Account</button>
          {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    )

};

export default Register;