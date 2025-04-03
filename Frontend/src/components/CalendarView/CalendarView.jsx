import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { renderEventContent } from '../../utils/calendarUtils.jsx';



const CalendarView = ({ view = 'dayGridMonth', height = 'auto', headerToolbar=true,events=[],editable = false, eventContent}) => {

    
    return(
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view}
        headerToolbar = {headerToolbar ? {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        } : false}
        height={height}
        editable = {editable}
        events = {events}
        contentHeight="auto"
        fixedWeekCount={false}
        showNonCurrentDates={true}
        eventContent={eventContent || renderEventContent}
        />            
    );
}

export default CalendarView;