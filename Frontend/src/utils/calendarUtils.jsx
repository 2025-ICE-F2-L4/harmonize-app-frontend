export const renderEventContent = (eventInfo) => {
  const { title, extendedProps, timeText } = eventInfo.event;
  const icon = extendedProps.icon;
  const people = extendedProps.people || [];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon && (
        <img
          src={icon}
          alt={title}
          style={{ width: '16px', height: '16px', objectFit: 'contain' }}
        />
      )}
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.85em' }}>
          {timeText} {title}
        </div>
        {people.length > 0 && (
          <div style={{ fontSize: '0.75em', color: '#555' }}>
            {people.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};
