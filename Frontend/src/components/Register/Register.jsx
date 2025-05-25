import React, { useState } from "react";
import "./Register.css";

const API_BASE = "https://harmonize-app-backend.vercel.app/";

const Register = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState(""); // Default role

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation
    if (password !== repassword) {
      setMessage("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}api/auth/signup`, {
        // Changed endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName, // Map to 'name' expected by backend
          email,
          password,
          // role: "Parent", // Add default role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setMessage("Account created successfully!");
      setTimeout(onClose, 1500);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="popup-register">
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Create Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text" // Changed from "userName"
            placeholder="Username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Repeat password"
            required
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select role</option>
            <option value="Parent">Parent</option>
            <option value="Child">Child</option>
          </select>
          <button type="submit" className="submit-register">
            Create Account
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
