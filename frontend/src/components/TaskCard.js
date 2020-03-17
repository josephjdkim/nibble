import React from 'react';

function CalendarCard({task}) {

  return(
    <div> 
      <div className="max-w-sm w-full lg:max-w-full mb-6">
        <div className="border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-4">
            <div className="text-gray-900 font-bold text-xl">{`${task.title}`}</div>
            <div className="text-gray-700 text-base">{`${task.category}`}</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <div className="text-gray-900 leading-none">{`${Math.floor(task.estimated_time/60)} hours ${Math.floor(task.estimated_time%60)} mins`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarCard;