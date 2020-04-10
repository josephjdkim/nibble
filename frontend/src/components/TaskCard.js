import React from 'react';

function CalendarCard({task}) {

  return(
    <div> 
      <div className="max-w-sm w-full lg:max-w-full mb-4">
        <div className="border border-white bg-white rounded-md shadow-lg p-4 flex flex-col justify-between leading-normal">
          <div className="my-2 flex items-center">
            <div className="text-gray-900 font-bold text-xl w-4/12">{`${task.title}`}</div>
            <div className="text-gray-700 text-base w-4/12">{`${task.category}`}</div>
            <div className=" text-sm text-gray-900 leading-none w-4/12">{`${Math.floor(task.estimated_time/60)} hours ${Math.floor(task.estimated_time%60)} mins`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarCard;