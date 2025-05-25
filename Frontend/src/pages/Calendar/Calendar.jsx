import React, { useState } from 'react';

import CalendarView from '../../components/CalendarView/CalendarView';
import './Calendar.css';
import { renderEventContent } from '../../utils/calendarUtils.jsx';


import Boardgames from '../../assets/activities/boardgames.png';
import Camp from '../../assets/activities/camp.png';
import Cinema from '../../assets/activities/cinema.png';
import Cooking from '../../assets/activities/cooking.png';
import Dinner from '../../assets/activities/dinner.png';
import Diy from '../../assets/activities/diy.png';
import Gaming from '../../assets/activities/gaming.png';
import Gardening from '../../assets/activities/gardening.png';
import Groceries from '../../assets/activities/groceries.png';
import Museum from '../../assets/activities/museum.png';
import Picnic from '../../assets/activities/picnic.png';
import Reading from '../../assets/activities/reading.png';
import Swimming from '../../assets/activities/swimming.png';
import Walk from '../../assets/activities/walk.png';
import Zoo from '../../assets/activities/zoo.png';

 
const Calendar = () => {
  const activities = [
    { title: 'Board Games', icon: Boardgames },
    { title: 'Camp', icon: Camp },
    { title: 'Cinema', icon: Cinema },
    { title: 'Cooking', icon: Cooking },
    { title: 'Dinner', icon: Dinner },
    { title: 'DIY', icon: Diy },
    { title: 'Gaming', icon: Gaming },
    { title: 'Gardening', icon: Gardening },
    { title: 'Groceries', icon: Groceries },
    { title: 'Museum', icon: Museum },
    { title: 'Picnic', icon: Picnic },
    { title: 'Reading', icon: Reading },
    { title: 'Swimming', icon: Swimming },
    { title: 'Walk', icon: Walk },
    { title: 'Zoo', icon: Zoo },
  ];
  
    const [selectedActivity, setSelectedActivity] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [participants, setParticipants] = useState('');
  const [events, setEvents] = useState([
    { title: 'Camping', date: '2025-04-01T09:00:00', extendedProps: { people: ['Mom', 'Dad', 'Max', 'Ashley'] } },
    { title: 'Horse riding', date: '2025-04-04T13:30:00', extendedProps: { people: ['Alice'] } },
    { title: 'Picnic', date: '2025-04-15T13:30:00', extendedProps: { people: ['Alice','Mom','Dad'] } },
    { title: 'Date', date: '2025-04-17T13:30:00', extendedProps: { people: ['Dad', 'Mom'] } },
    { title: 'Cinema', date: '2025-04-20T20:30:00', extendedProps: { people: ['Max','Alice'] } },
    { title: 'Bike trip', date: '2025-04-25T11:00:00', extendedProps: { people: ['Mom','Alice'] } },
    { title: 'Board Games', date: '2025-04-30T18:30:00', extendedProps: { people: ['Alice','Mom','Dad','Max'] } },
  ]);

  const handleAddEvent = (e) => {
    e.preventDefault();
  
  const activity = activities.find((a) => a.title === selectedActivity);
    if (!activity) return;
    
  const newEvent = {
      title: activity.title,
      date: `${eventDate}T${eventTime}`,
      extendedProps: {
        people: participants.split(',').map(p => p.trim()),
        icon: activity.icon
      }
    };
    
    setEvents([...events, newEvent]);
    setSelectedActivity('');
    setEventDate('');
    setEventTime('');
    setParticipants('');
  };


  return (
    <div className="calendar-page">
      <div className="calendar-full">
        <CalendarView
          view="dayGridMonth"
          height="90vh"
          headerToolbar={true}
          events={events}
          editable={true}
          eventContent={renderEventContent}
        />
      </div>
      <div className='add-event-container'>
        <h1 className='add-event-title'>Add Event</h1>
        <form className='add-event-form' onSubmit={handleAddEvent}>
          <label className='add-event-label'>Activity:</label>
          <select
            className='add-event-input'
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            required
          >
            <option value="">-- Select activity --</option>
            {activities.map((activity, idx) => (
              <option key={idx} value={activity.title}>{activity.title}</option>
            ))}
          </select>

          <label className='add-event-label'>Date:</label>
          <input type="date" className='add-event-input' value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />

          <label className='add-event-label'>Time:</label>
          <input type="time" className='add-event-input' value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />

          <label className='add-event-label'>Participants:</label>
          <input
            type="text"
            className='add-event-input'
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="e.g., Mom, Dad"
          />

          <button type="submit" className='add-event-button'>Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default Calendar;