import React, { useState, useEffect } from "react";
import CalendarView from "../../components/CalendarView/CalendarView";
import AddActivities from "../Activities/AddActivities.jsx"; // Corrected import path based on your directory structure
import { jwtDecode } from "jwt-decode"; // Import jwtDecode for client-side token decoding

import "./Calendar.css";
import { renderEventContent } from "../../utils/calendarUtils.jsx";

// Import your activity icons (these are likely only needed if you have hardcoded activities or specific local rendering logic)
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

const Calendar = () => {
  // --- OLD/LOCAL STATE FORMS ARE COMMENTED OUT OR REMOVED ---
  // These states were for the local activity form which we are replacing with the AddActivities modal
  // const [selectedActivity, setSelectedActivity] = useState('');
  // const [eventDate, setEventDate] = useState('');
  // const [eventTime, setEventTime] = useState('');
  // const [participants, setParticipants] = useState('');
  // const [events, setEvents] = useState([ /* ... your hardcoded events ... */ ]);

  // State to store the decoded token payload (contains userId and family_id)
  const [tokenPayload, setTokenPayload] = useState(null);

  // State for managing the AddActivities modal's visibility
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

  // Effect hook to decode the JWT token from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT token
        setTokenPayload(decoded); // Store the decoded payload
        console.log("DEBUG FRONTEND: Decoded token payload:", decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        setTokenPayload(null); // Clear payload if decoding fails (e.g., token is malformed)
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount
  const activityIcons = [
    { name: "Board Games", path: Boardgames },
    { name: "Camp", path: Camp },
    { name: "Cinema", path: Cinema },
    { name: "Cooking", path: Cooking },
    { name: "Dinner", path: Dinner },
    { name: "DIY", path: Diy },
    { name: "Gaming", path: Gaming },
    { name: "Gardening", path: Gardening },
    { name: "Groceries", path: Groceries },
    { name: "Museum", path: Museum },
    { name: "Picnic", path: Picnic },
    { name: "Reading", path: Reading },
    { name: "Swimming", path: Swimming },
    { name: "Walk", path: Walk },
    { name: "Zoo", path: Zoo },
  ];
  // Handler to open the AddActivities modal
  const handleOpenAddActivityModal = () => {
    // Only allow opening the modal if we successfully decoded user information
    if (tokenPayload && tokenPayload.userId && tokenPayload.family_id) {
      setIsAddActivityModalOpen(true);
    } else {
      console.warn(
        "Cannot open Add Activity modal: User not logged in or token data missing."
      );
      // Optionally, show a user-friendly message or redirect to login
      alert("Please log in to add activities.");
    }
  };

  // Handler to close the AddActivities modal
  const handleCloseAddActivityModal = () => {
    setIsAddActivityModalOpen(false);
    // After an activity is potentially added/closed, CalendarView should re-fetch.
    // If CalendarView does NOT automatically refetch its events (e.g., its useEffect
    // has no dependencies that would change), you might need to trigger a refresh here.
    // A simple way is to force a re-render of CalendarView by changing a key prop
    // or by adding a state that CalendarView's useEffect depends on.
    // For now, we assume CalendarView's internal fetch handles it.
  };

  // Handler for when an activity is successfully added from the modal
  const handleActivityAdded = (newActivityData) => {
    console.log("Activity successfully added via modal:", newActivityData);
    handleCloseAddActivityModal(); // Close the modal after successful addition
    // If CalendarView isn't updating automatically, you might need to manually
    // trigger a refetch or update its internal state here.
  };

  // --- OLD handleAddEvent function is removed as it's replaced by the modal ---
  // const handleAddEvent = (e) => { /* ... */ };

  return (
    <div className="calendar-page">
      <div className="calendar-full">
        {/*
          CalendarView component displays the calendar.
          It now fetches its events directly from the backend API in its own useEffect.
          The 'events' prop is no longer passed from this component.
        */}
        <CalendarView
          view="dayGridMonth"
          height="90vh"
          headerToolbar={true}
          // events={events} // REMOVED: CalendarView fetches its own events from backend
          editable={true} // Set to true if you want FullCalendar's drag-and-drop/resize features
          eventContent={renderEventContent} // Custom rendering for event content
        />
      </div>

      {/*
        This div acts as the clickable area to open the AddActivities modal.
        The old local form for adding activities has been removed from here.
      */}
      <div className="add-event-container" onClick={handleOpenAddActivityModal}>
        <h1 className="add-event-title">Add Event</h1>
        <p>Click here to add a new activity to your family calendar!</p>
        <button type="button" className="add-event-button">
          Open Add Activity Form
        </button>
      </div>

      {/*
        The AddActivities modal is rendered conditionally.
        It requires 'isOpen' to be true to show, 'onClose' to handle closing,
        'onActivityAdded' for post-addition logic, and 'loggedInUser' which
        now comes from the decoded JWT token.
      */}
      {tokenPayload && ( // Render the modal only if we have decoded token data
        <AddActivities
          isOpen={isAddActivityModalOpen}
          onClose={handleCloseAddActivityModal}
          onActivityAdded={handleActivityAdded}
          // Pass the necessary user information extracted from the token
          loggedInUser={{
            userId: tokenPayload.userId,
            family_id: tokenPayload.family_id,
            // You can also pass email, role, etc., if they are in the token payload
            // email: tokenPayload.email,
            // role: tokenPayload.role,
          }}
          activityIcons={activityIcons}
        />
      )}
    </div>
  );
};

export default Calendar;
