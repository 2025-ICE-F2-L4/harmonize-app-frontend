import React, { useState } from 'react';
import CalendarView from '../../components/CalendarView/CalendarView';
import './Calendar.css';
import { renderEventContent } from '../../utils/calendarUtils.jsx';


const Calendar = () => {


  return (
    <div className="calendar-full">
      <CalendarView
        view = "dayGridMonth"
        height='90vh'
        headerToolbar={true}
        events={[
          { title: 'Camping', date: '2025-04-01T09:00:00', extendedProps: { people: ['Mom', 'Dad', 'Max', 'Ashley'] } },
          { title: 'Horse riding', date: '2025-04-04T13:30:00', extendedProps: { people: ['Alice'] } }
        ]}
        editable={true}
        eventContent={ renderEventContent }
        />
    </div>
  );
};

export default Calendar;