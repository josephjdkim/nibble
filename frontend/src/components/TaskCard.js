import React from 'react';

function CalendarCard({task}) {

  return(
    <div> 
      <div class="max-w-sm w-full lg:max-w-full mb-6">
        <div class="border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-4">
            <div class="text-gray-900 font-bold text-xl">{`${task.title}`}</div>
            <div class="text-gray-700 text-base">{`${task.category}`}</div>
          </div>
          <div class="flex items-center">
            <div class="text-sm">
              <div class="text-gray-900 leading-none">{`${Math.floor(task.estimated_time/60)} hours ${Math.floor(task.estimated_time%60)} mins`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarCard;