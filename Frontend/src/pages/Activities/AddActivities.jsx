import React, { useState } from "react";
import "./AddActivities.css"; // Ensure this path is correct

// Import your activity images
import Boardgames from "../../assets/activities/boardgames.png";
import Camp from "../../assets/activities/camp.png";
import Cinema from "../../assets/activities/cinema.png";
import Cooking from "../../assets/activities/cooking.png";
import Dinner from "../../assets/activities/dinner.png";
import Diy from "../../assets/activities/diy.png";
import Gaming from "../../assets/activities/gaming.png";
import Gardening from "../../assets/activities/gardening.png";
import Groceries from "../../assets/activities/groceries.png";
import Museum from "../../assets/activities/museum.png";
import Picnic from "../../assets/activities/picnic.png";
import Reading from "../../assets/activities/reading.png";
import Swimming from "../../assets/activities/swimming.png";
import Walk from "../../assets/activities/walk.png";
import Zoo from "../../assets/activities/zoo.png";

// Your backend base URL
const API_BASE = "https://harmonize-app-backend.vercel.app";

const AddActivities = ({ isOpen, onClose, onActivityAdded }) => {
  // If the popup is not open, return null
  if (!isOpen) return null;

  const activityImages = [
    { src: Boardgames, alt: "Board games" },
    { src: Camp, alt: "Camp" },
    { src: Cinema, alt: "Cinema" },
    { src: Cooking, alt: "Cooking" },
    { src: Dinner, alt: "Dinner" },
    { src: Diy, alt: "DIY" },
    { src: Gaming, alt: "Gaming" },
    { src: Gardening, alt: "Gardening" },
    { src: Groceries, alt: "Groceries" },
    { src: Museum, alt: "Museum" },
    { src: Picnic, alt: "Picnic" },
    { src: Reading, alt: "Reading" },
    { src: Swimming, alt: "Swimming" },
    { src: Walk, alt: "Walk" },
    { src: Zoo, alt: "Zoo" },
  ];

  const [name, setName] = useState("");
  const [date, setDate] = useState(""); // New state for activity date
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!name || !date || !selectedImage) {
      setError("Please fill in all fields (name, date, and select an image).");
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    const activityData = {
      name: name,
      date: date, // Send date as YYYY-MM-DD or ISO string
      // You might want to store the image path in the activity if your backend supports it
      // For now, we're just sending name and date as per backend route
      image: selectedImage, // Sending image to backend as well, adjust backend model if needed
    };

    try {
      const response = await fetch(`${API_BASE}/api/activities/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Authorization": `Bearer ${token}`, // Use your custom header
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add activity.");
      }

      const result = await response.json();
      console.log("Activity added successfully:", result.data);

      // Call the prop to notify parent component (e.g., to refresh activities list)
      if (onActivityAdded) {
        onActivityAdded(result.data);
      }

      // Reset form fields and close popup
      setName("");
      setDate("");
      setSelectedImage(null);
      onClose();
    } catch (err) {
      console.error("Error creating activity:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup">
      <button className="close-button" onClick={onClose} disabled={isLoading}>
        {" "}
        X{" "}
      </button>
      <h2>Dodaj aktywność</h2>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Activity name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
        <input
          type="date" // Use type="date" for a date picker
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isLoading}
          required
        />
        <div className="image-picker">
          {activityImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              className={`image-option ${
                selectedImage === img.src ? "selected" : ""
              }`}
              onClick={() => setSelectedImage(img.src)}
              disabled={isLoading}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={isLoading || !name || !date || !selectedImage}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddActivities;
