// src/components/Activities.jsx - UPDATED AGAIN

import React, { useState, useEffect } from "react";
import "./Activities.css";
import AddActivities from "./AddActivities"; // Make sure this path is correct
import AddCustomActivities from "./AddCustomActivities";


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

// const API_BASE = "https://harmonize-app-backend.vercel.app";
const API_BASE = import.meta.env.VITE_API_URL;



const Activities = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customActivities, setCustomActivities] = useState([]);
  const [currentLoggedInUserData, setCurrentLoggedInUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingUser(true);
      setUserError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setUserError("No authentication token found. Please log in.");
        setIsLoadingUser(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/user/me`, {
          method: "GET",
          headers: {
            "X-App-Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user data.");
        }

        setCurrentLoggedInUserData(data.data);
        console.log(
          "Activities.jsx - Fetched User Data (data.data):",
          data.data
        );
        console.log(
          "Activities.jsx - family_id from data.data:",
          data.data?.family_id
        );
      } catch (err) {
        console.error("Activities.jsx - Error fetching user data:", err);
        setUserError(
          err.message || "An error occurred while fetching user data."
        );
        setCurrentLoggedInUserData(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  const handleActivityAdded = (newActivity) => {
    console.log("New activity successfully added:", newActivity);
    setCustomActivities((prev) => [...prev, newActivity]);
    setIsOpen(false);
  };

  console.log(
    "Activities.jsx - currentLoggedInUserData state (before render):",
    currentLoggedInUserData
  );
  console.log(
    "Activities.jsx - family_id from state (before render):",
    currentLoggedInUserData?.family_id
  );

  if (isLoadingUser) {
    return <div className="activities-page">Loading user data...</div>;
  }

  if (userError) {
    return <div className="activities-page error-message">{userError}</div>;
  }


  

  return (
    <div className="activities-page">
      <div className="activities-header">
        <h1>Choose an activity</h1>
      </div>

      {!currentLoggedInUserData?.family_id && (
        <p className="info-message">
          Please join or create a family to manage activities.
        </p>
      )}

      <div className="activities-panel">
        <div className="activities-content">
          {/* Predefined Activities */}
          <div className="activity-card">
            <img
              src={Boardgames}
              alt="Board games"
              className="activity-image"
            />
            <div className="activity-name">
              <p>Board games</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Camp} alt="Camp" className="activity-image" />
            <div className="activity-name">
              <p>Camp</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Cinema} alt="Cinema" className="activity-image" />
            <div className="activity-name">
              <p>Cinema</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Cooking} alt="Cooking" className="activity-image" />
            <div className="activity-name">
              <p>Cooking</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Dinner} alt="Dinner" className="activity-image" />
            <div className="activity-name">
              <p>Dinner</p>
            </div>
          </div>

          <div className="activity-card">
            <img src={Diy} alt="Diy" className="activity-image" />
            <div className="activity-name">
              <p>Diy</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Gaming} alt="Gaming" className="activity-image" />
            <div className="activity-name">
              <p>Gaming</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Gardening} alt="Gardening" className="activity-image" />
            <div className="activity-name">
              <p>Gardening</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Groceries} alt="Groceries" className="activity-image" />
            <div className="activity-name">
              <p>Groceries</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Museum} alt="Museum" className="activity-image" />
            <div className="activity-name">
              <p>Museum</p>
            </div>
          </div>

          <div className="activity-card">
            <img src={Picnic} alt="Picnic" className="activity-image" />
            <div className="activity-name">
              <p>Picnic</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Reading} alt="Reading" className="activity-image" />
            <div className="activity-name">
              <p>Reading</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Swimming} alt="Swimming" className="activity-image" />
            <div className="activity-name">
              <p>Swimming</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Walk} alt="Walk" className="activity-image" />
            <div className="activity-name">
              <p>Walk</p>
            </div>
          </div>
          <div className="activity-card">
            <img src={Zoo} alt="Zoo" className="activity-image" />
            <div className="activity-name">
              <p>Zoo</p>
            </div>
          </div>

          {/* Custom Activities - now will display newly added ones */}
          {customActivities.map((activity, index) => (
            <div key={activity._id || index} className="activity-card">
              <img
                src={activity.image || "path/to/default-image.png"}
                alt={activity.name}
                className="activity-image"
              />
              <div className="activity-name">
                <p>{activity.name}</p>
                {activity.datetime && (
                  <p>{new Date(activity.datetime).toLocaleString()}</p>
                )}
                {/* No points display */}
              </div>
            </div>
          ))}

          {/* ALWAYS RENDER THE BUTTON, AddActivities handles its own validation */}
          <div className="new-activity-card">
            <button
              className="new-activity-button"
              onClick={() => setIsOpen(true)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <AddCustomActivities
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={handleActivityAdded}
      />

    </div>
  );
};

export default Activities;
