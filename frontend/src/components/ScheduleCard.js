import React from 'react';

function ScheduleCard({event}) {

  return (
    <div> 
      {`${event.summary} (${event.start.dateTime})`}
    </div>
  )
}

export default ScheduleCard;