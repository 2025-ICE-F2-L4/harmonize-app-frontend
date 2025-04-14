export const renderEventContent = (eventInfo) => {
    const people = eventInfo.event.extendedProps.people;
  
    return (
      <div>
        <strong>{eventInfo.timeText}</strong>
        <div style={{ fontWeight: 600 }}>{eventInfo.event.title}</div>
        {people && (
          <div style={{ fontSize: '0.8em', color: '#555' }}>
            {people.join(', ')}
          </div>
        )}
      </div>
    );
  };
  