"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarView = ({
  view = "dayGridMonth", // Default view for the calendar
  height = "auto", // Calendar height
  headerToolbar = true, // Whether to display the header toolbar (navigation, views)
  editable = false, // Whether events are editable on the calendar
  eventContent, // Custom render function for event content
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
          "DEBUG FRONTEND: Generated X-App-Authorization header value:",
          authHeaderValue
        );
        console.log(
          "DEBUG FRONTEND: Does header start with 'Bearer '?",
          authHeaderValue.startsWith("Bearer ")
        );

        const backendUrl = "https://harmonize-app-backend.vercel.app";

        console.log(
          "Attempting to fetch from:",
          `${backendUrl}/api/activities`
        );

        const headersBeingSent = {
          "Content-Type": "application/json",
          "X-App-Authorization": authHeaderValue,
        };

        console.log(
          "DEBUG FRONTEND: Headers object prepared for sending:",
          headersBeingSent
        );

        const response = await fetch(`${backendUrl}/api/activities`, {
          method: "GET",
          headers: headersBeingSent,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! status: ${response.status} - ${response.statusText}`,
            errorText
          );
          throw new Error(
            `HTTP error! status: ${response.status} - ${
              response.statusText
            }. Details: ${errorText.substring(0, 100)}`
          );
        }

        const data = await response.json();
        setEvents(data.data);
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
  }, []); // Empty dependency array means this effect runs once on mount

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
      events={events
        .map((activity) => {
          // --- CRUCIAL FIX HERE: Use activity.datetime instead of activity.date ---
          const eventDate = new Date(activity.datetime);

          // Robust check for Invalid Date
          if (isNaN(eventDate.getTime())) {
            console.warn(
              `Skipping activity "${activity.name}" (ID: ${activity._id}) due to invalid datetime:`,
              activity.datetime
            );
            return null; // Return null for invalid events, will be filtered out
          }

          return {
            id: activity._id,
            title: activity.name,
            start: eventDate.toISOString(),
            // Add extendedProps to pass custom data like icon and participants
            extendedProps: {
              icon: activity.icon, // Pass the icon path
              participants: activity.participants, // Pass participants if you want to show them
            },
          };
        })
        .filter(Boolean)}
      contentHeight="auto"
      fixedWeekCount={false}
      showNonCurrentDates={true}
      eventContent={eventContent || renderEventContent} // Use custom or default render function
    />
  );
};

// Default render function for event content, if not provided via props
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b> {/* Displays time if applicable */}
      <i>{eventInfo.event.title}</i> {/* Displays event title */}
    </>
  );
}

export default CalendarView;
