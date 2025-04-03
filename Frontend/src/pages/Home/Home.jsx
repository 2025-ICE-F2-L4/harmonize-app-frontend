import CalendarView from "../../components/CalendarView/CalendarView";
import './Home.css';
import { renderEventContent } from '../../utils/calendarUtils.jsx';

const Home = () => {
const events = [
    { title: 'Camping', date: '2025-04-01T09:00:00', extendedProps: { people: ['Mom', 'Dad', 'Max', 'Ashley'] } },
    { title: 'Horse riding', date: '2025-04-04T13:30:00', extendedProps: { people: ['Alice'] } },
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