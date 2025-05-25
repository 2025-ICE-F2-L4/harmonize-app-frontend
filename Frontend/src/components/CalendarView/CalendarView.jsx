"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarView = ({
  view = "dayGridMonth",
  height = "auto",
  headerToolbar = true,
  editable = false,
  eventContent,
}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        console.log("DEBUG FRONTEND: Raw token from localStorage:", token);

        if (!token || typeof token !== "string" || token.trim() === "") {
          console.error(
            "DEBUG FRONTEND: Token is missing, null, undefined, or empty. Cannot proceed with authorized fetch."
          );
          setError(
            "Authentication required to view activities. Please log in."
          );
          setLoading(false);
          return;
        }

        const authHeaderValue = `Bearer ${token}`;
        console.log(
          "DEBUG FRONTEND: Generated X-App-Authorization header value:", // Changed log message
          authHeaderValue
        );
        console.log(
          "DEBUG FRONTEND: Does header start with 'Bearer '?",
          authHeaderValue.startsWith("Bearer ")
        );

        const backendUrl = "https://harmonize-app-backend.vercel.app"; // Your backend URL

        console.log(
          "Attempting to fetch from:",
          `${backendUrl}/api/activities`
        );

        // --- THE CRUCIAL CHANGE IS HERE ---
        const headersBeingSent = {
          "Content-Type": "application/json",
          "X-App-Authorization": authHeaderValue, // Your custom authorization header
        };

        console.log(
          "DEBUG FRONTEND: Headers object prepared for sending:",
          headersBeingSent
        ); // <-- ADD THIS LOG

        const response = await fetch(`${backendUrl}/api/activities`, {
          method: "GET", // Specify the method
          headers: headersBeingSent, // Pass the headers object
        });
        // --- END OF CRUCIAL CHANGE ---

        if (!response.ok) {
          const errorText = await response.text(); // Get raw text for better debugging
          console.error(
            `HTTP error! status: ${response.status} - ${response.statusText}`,
            errorText
          );
          throw new Error(
            `HTTP error! status: ${response.status} - ${
              response.statusText
            }. Details: ${errorText.substring(0, 100)}` // Show part of error text
          );
        }

        const data = await response.json();
        setEvents(data.data); // Assuming your backend returns { success: true, data: [...] }
        console.log(
          "DEBUG FRONTEND: Activities fetched successfully:",
          data.data
        );
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setError(`Failed to load activities: ${err.message}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading activities...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={view}
      headerToolbar={
        headerToolbar
          ? {
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }
          : false
      }
      height={height}
      editable={editable}
      events={events.map((activity) => ({
        // Map your activity data to FullCalendar event format
        id: activity._id,
        title: activity.name,
        start: new Date(activity.date).toISOString().split("T")[0], // Convert date to YYYY-MM-DD
        // Add other event properties as needed, e.g., end, allDay, color
      }))}
      contentHeight="auto"
      fixedWeekCount={false}
      showNonCurrentDates={true}
      eventContent={eventContent || renderEventContent} // You'll need to define renderEventContent if not already
    />
  );
};

// Example renderEventContent if you don't have one
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalendarView;
