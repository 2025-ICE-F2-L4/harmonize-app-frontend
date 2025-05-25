import React from "react"; // Make sure React is imported here if it's a separate file

// This function receives eventInfo which contains event.extendedProps
function renderEventContent(eventInfo) {
  const { icon, participants } = eventInfo.event.extendedProps;
  const timeText = eventInfo.timeText; // Time string from FullCalendar

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "0.85em",
        padding: "2px",
      }}
    >
      {icon && (
        <img
          src={icon}
          alt={eventInfo.event.title}
          style={{
            width: "16px",
            height: "16px",
            marginRight: "5px",
            borderRadius: "50%",
          }}
        />
      )}
      <div style={{ flexGrow: 1 }}>
        <b>{timeText}</b>
        <br />
        <span>{eventInfo.event.title}</span>
        {participants && participants.length > 0 && (
          <div style={{ fontSize: "0.75em", opacity: 0.7 }}>
            ({participants.join(", ")})
          </div>
        )}
      </div>
    </div>
  );
}

export { renderEventContent }; // Export it if this is a separate utility file
