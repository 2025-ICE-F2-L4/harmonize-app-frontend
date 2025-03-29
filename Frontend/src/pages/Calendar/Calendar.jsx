import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css'; // Import the CSS file

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2023-10-01' },
    { title: 'Event 2', date: '2023-10-02' },
  ]);

  const handleDateClick = (arg) => {
    const newEvent = { title: 'New Event', date: arg.dateStr };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-inner">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
        />
      </div>
    </div>
  );
};

export default Calendar;