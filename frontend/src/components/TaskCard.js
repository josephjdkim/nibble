import React, { useState, useEffect } from 'react';
import moment from 'moment';

function TaskCard({task}) {
  const currentTime = moment().utc();
  const startedTime = moment(task.time_started);
  const timeDiff = moment.utc(moment(currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(startedTime,"DD/MM/YYYY HH:mm:ss")));
  const [timeElapsed, setTimeElapsed] = useState(timeDiff);

  useEffect(() => {
    if (task.time_started) {
      const interval = setInterval(() => {
        setTimeElapsed(timeElapsed => moment(timeElapsed).add(1, 'seconds'));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [])

  return(
    <div className="max-w-sm w-full bg-white lg:max-w-full mb-4">
      <div className="border border-white rounded-md shadow-lg p-4 flex flex-col justify-between leading-normal">
        <div className="my-2 flex items-center">
          <div className="text-gray-900 font-bold text-xl w-4/12">{`${task.title}`}</div>
          <div className="text-gray-700 text-base w-4/12">{`${task.category}`}</div>
          <div className=" text-sm text-gray-900 leading-none w-4/12">
            {task.time_started ? `${timeElapsed.format("HH:mm:ss")} /`: null} {moment.utc().hours(Math.floor(task.estimated_time/60)).minutes(Math.floor(task.estimated_time%60)).seconds(0).format("hh:mm:ss")}
            </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard;