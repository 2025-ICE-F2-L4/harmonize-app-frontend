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

        // --- ADD THIS LOG LINE ---
        console.log(
          "Deployed NEXT_PUBLIC_BACKEND_URL:",
          process.env.NEXT_PUBLIC_BACKEND_URL
        );
        // --- END ADDED LOG LINE ---

        // Ensure you're using the environment variable here
        const backendUrl = "https://harmonize-app-backend.vercel.app";

        if (!backendUrl) {
          throw new Error(
            "NEXT_PUBLIC_BACKEND_URL is not set in the Vercel environment!"
          );
        }

        console.log(
          "Attempting to fetch from:",
          `${backendUrl}/api/activities`
        );

        const response = await fetch(`${backendUrl}/api/activities`);

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        setEvents(data);
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
      events={events} // Pass the fetched events here
      contentHeight="auto"
      fixedWeekCount={false}
      showNonCurrentDates={true}
      eventContent={eventContent || renderEventContent}
    />
  );
};

export default CalendarView;
