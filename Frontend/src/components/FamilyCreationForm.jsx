// src/components/FamilyCreationForm.jsx (Recommended Location)
import React, { useState } from "react";

// const API_BASE = "https://harmonize-app-backend.vercel.app"; // Your backend URL
const API_BASE = import.meta.env.VITE_API_URL;

const FamilyCreationForm = ({ onFamilyCreated }) => {
  const [familyName, setFamilyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!familyName.trim()) {
      setError("Family name cannot be empty.");
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/family/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: familyName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create family.");
      }

      const result = await response.json();
      setSuccessMessage(
        `Family "${result.data.name}" created! Access Code: ${result.data.access_code}`
      );
      console.log("Family created successfully:", result.data);

      // Notify the parent component (FamilyManagement) that a family was created
      if (onFamilyCreated) {
        onFamilyCreated(result.data);
      }

      setFamilyName(""); // Clear the input field
    } catch (err) {
      console.error("Error creating family:", err);
      setError(
        err.message || "An unexpected error occurred during family creation."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="family-creation-form-container">
      <h3>Create Your Family</h3>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="familyName">Family Name:</label>
        <input
          id="familyName"
          type="text"
          placeholder="e.g., The Smiths"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          disabled={isLoading}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Family"}
        </button>
      </form>
    </div>
  );
};

export default FamilyCreationForm;
