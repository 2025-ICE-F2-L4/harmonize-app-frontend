import React, { useState } from "react";
import "./AddActivities.css"; // Assuming you have a CSS file for styling

const API_BASE = import.meta.env.VITE_API_URL;

const AddActivities = ({
  isOpen,
  onClose,
  onActivityAdded,
  loggedInUser,
  activityIcons,
}) => {
  const [activityName, setActivityName] = useState("");
  const [activityDate, setActivityDate] = useState(""); // YYYY-MM-DDTHH:mm format
  const [activityDescription, setActivityDescription] = useState("");
  const [participants, setParticipants] = useState("");
  const [selectedIconPath, setSelectedIconPath] = useState(""); // New state for selected icon path

  // Reset form fields when the modal is opened/closed
  // (Optional: you can also clear on successful submission)
  useState(() => {
    if (!isOpen) {
      setActivityName("");
      setActivityDate("");
      setActivityDescription("");
      setParticipants("");
      setSelectedIconPath(""); // Reset icon path
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUser || !loggedInUser.userId || !loggedInUser.family_id) {
      alert(
        "Authentication error: User information is missing. Please log in again."
      );
      console.error("User not logged in or missing userId/family_id.");
      return;
    }

    if (!activityName || !activityDate || !selectedIconPath) {
      // Require icon selection
      alert(
        "Please fill in all required fields (Activity Name, Date & Time, Icon)."
      );
      return;
    }

    const activityData = {
      name: activityName,
      datetime: activityDate, // Use 'datetime' as per your backend schema
      description: activityDescription,
      participants: participants
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean), // Split by comma, trim, filter empty strings
      userId: loggedInUser.userId,
      family_id: loggedInUser.family_id,
      icon: selectedIconPath, // ADD THIS TO THE PAYLOAD
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await fetch(
        `${API_BASE}/api/activities/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-App-Authorization": `Bearer ${token}`, // Your custom authorization header
          },
          body: JSON.stringify(activityData),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          errorDetails.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      alert("Activity added successfully!");
      console.log("Activity created:", result);
      onActivityAdded(result.data); // Call the callback with the new activity data
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to add activity:", error);
      alert(`Failed to add activity: ${error.message}`);
    }
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Add New Activity</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="activityName">Activity Name:</label>
            <input
              type="text"
              id="activityName"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="activityDateTime">Date & Time:</label>
            <input
              type="datetime-local" // HTML5 input for date and time
              id="activityDateTime"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="activityDescription">Description (Optional):</label>
            <textarea
              id="activityDescription"
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          {/* New form group for Icon Selection */}
          <div className="form-group">
            <label htmlFor="activityIcon">Select Icon:</label>
            <select
              id="activityIcon"
              value={selectedIconPath}
              onChange={(e) => setSelectedIconPath(e.target.value)}
              required
            >
              <option value="">-- Select an icon --</option>
              {activityIcons &&
                activityIcons.map((icon, index) => (
                  <option key={index} value={icon.path}>
                    {icon.name}
                  </option>
                ))}
            </select>
            {selectedIconPath && (
              <img
                src={selectedIconPath}
                alt="Selected Icon"
                className="selected-icon-preview"
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "10px",
                  verticalAlign: "middle",
                }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="participants">
              Participants (comma-separated):
            </label>
            <input
              type="text"
              id="participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="e.g., Mom, Dad, Max"
            />
          </div>

          <button type="submit" className="submit-button">
            Add Activity
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddActivities;
