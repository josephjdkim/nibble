import React from 'react';

function ScheduleCard({event}) {

  let eventDate = new Date(event.start.dateTime);
  eventDate = `${eventDate.getMonth()+1}/${eventDate.getDate()}/${eventDate.getFullYear()} ${eventDate.getHours()}:${eventDate.getMinutes()}`;

  return (
    <div className="max-w-sm w-full rounded-md bg-white lg:max-w-full mb-4 shadow-md">
      <div className="p-4 flex flex-col justify-between leading-normal">
        <div className="my-2">
          <div className="text-gray-900 font-bold text-xl">{`${event.summary}`}</div>
          {/* <div className="text-gray-700 text-base">{`${task.category}`}</div> */}
          <div className=" text-sm text-gray-900 leading-none">{`${eventDate}`}</div>
        </div>
      </div>
    </div>
    // <div> 
    //   {`${event.summary} (${eventDate})`}
    // </div>
  )
}

export default ScheduleCard;