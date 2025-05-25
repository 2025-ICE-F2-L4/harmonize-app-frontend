import React, { useState } from "react";
import "./Login.css"; // Ensure this path is correct for your CSS
import Logo from "../../assets/logo/logo.png"; // Ensure this path is correct for your logo
import { useNavigate } from "react-router-dom";
import Register from "../../components/Register/Register.jsx"; // Ensure this path is correct for your Register component

// Your backend base URL 
const API_BASE = "https://harmonize-app-backend.vercel.app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State for the Register modal/component

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/login`, // Full API endpoint for login
        {
          method: "POST",
          // credentials: "include", // This was commented out in your last version, keep it that way for login
          headers: {
            "Content-Type": "application/json", // Important for sending JSON body
          },
          body: JSON.stringify({ email, password }), // Send email and password as JSON
        }
      );

      if (!response.ok) {
        // If the response is not OK (e.g., 400, 401, 403, 500)
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.error || "Login failed"); // Throw an error with the message from the backend
      }

      const data = await response.json(); // Parse the successful response

      const { token, user } = data.data; // Extract token and user data from the response

      // Store user data and token in localStorage
      console.log("DEBUG FRONTEND: Token received from backend:", token);
      localStorage.setItem("token", token); // Store the JWT token
      console.log(
        "DEBUG FRONTEND: Token *immediately after* storing in localStorage:",
        localStorage.getItem("token")
      );
      localStorage.setItem("user", JSON.stringify(user)); // Store user details (JSON stringified)

      // Redirect to the dashboard or home page after successful login
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error); // Log the error to console
      setError(error.message || "Login failed. Please try again."); // Display user-friendly error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-image" />
        </div>
        <div className="login-container">
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Display error message if any */}
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
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}{" "}
              {/* Button text changes based on loading state */}
            </button>
          </form>
          <button className="forgot-password-button">Forgot password?</button>
          <div className="separator">
            <span>New to Harmonize?</span>
          </div>
          <button
            className="register-button"
            onClick={() => setIsRegisterOpen(true)} // Open the Register modal/component
          >
            Create account
          </button>
        </div>
      </div>
      {/* Register component/modal, conditionally rendered */}
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};

export default Login;
