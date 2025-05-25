import React, { useState } from "react";
import "./Register.css";

const API_BASE = "https://harmonize-app-backend.vercel.app/";

const Register = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [role, setRole] = useState("Parent"); // New state for role, default to "Parent"
  const [message, setMessage] = useState("");

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email,
          password,
          role, // Use the role from state
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setMessage("Account created successfully!");
      // Optionally reset form fields
      setUserName("");
      setEmail("");
      setPassword("");
      setRepassword("");
      setRole("Parent"); // Reset role to default
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
            type="text"
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

          {/* New Role Selection */}
          <div className="role-selection">
            <label htmlFor="role">I am a:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
            </select>
          </div>

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
