import CalendarView from "../../components/CalendarView/CalendarView";
import './Home.css';
import { renderEventContent } from '../../utils/calendarUtils.jsx';

const Home = () => {
const events = [
    { title: 'Camping', date: '2025-04-01T09:00:00', extendedProps: { people: ['Mom', 'Dad', 'Max', 'Ashley'] } },
    { title: 'Horse riding', date: '2025-04-04T13:30:00', extendedProps: { people: ['Alice'] } },
    { title: 'Picnic', date: '2025-04-15T13:30:00', extendedProps: { people: ['Alice','Mom','Dad'] } },
    { title: 'Date', date: '2025-04-17T13:30:00', extendedProps: { people: ['Dad', 'Mom'] } },
    { title: 'Cinema', date: '2025-04-20T20:30:00', extendedProps: { people: ['Max','Alice'] } },
    { title: 'Bike trip', date: '2025-04-25T11:00:00', extendedProps: { people: ['Mom','Alice'] } },
    { title: 'Board Games', date: '2025-04-30T18:30:00', extendedProps: { people: ['Alice','Mom','Dad','Max'] } },
  ];





    return (  
        <div className="home">
            <h2>Calendar</h2>
            <p>Current week</p>
        <div className="home-calendar-wrapper">
            <CalendarView
            view="dayGridWeek"
            height="auto"
            headerToolbar={false} 
            events={events}
            eventContent={renderEventContent} 
            />
        </div>


        </div>
    );
}
 
export default Home;