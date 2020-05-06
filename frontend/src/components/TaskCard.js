import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function TaskCard({task, updateTasks}) {
  const apiServer = 'http://localhost:5001/'
  const [showTaskInfo, handleTaskInfo] = useState(false);

  const [payload, setPayload] = useState({...task})

  const currentTime = moment().utc();
  const startedTime = moment(task.time_started);
  const timeDiff = moment.utc(moment(currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(startedTime,"DD/MM/YYYY HH:mm:ss")));
  const [timeElapsed, setTimeElapsed] = useState(timeDiff);
  const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
  
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

  async function handleTaskUpdate(event) {
    event.preventDefault();
    const route = event.target.name+"Task";
    console.log(route);
    console.log(payload);
    // newPayload = {...payload}
    payload['userID'] = userID
    setPayload(payload);
    console.log(route.slice(0, route.length-4) == "update");
    if (route.slice(0, route.length-4) == "update") {
      await axios.put(`${apiServer}${route}/${userID}`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } else if (route.slice(0, route.length-4) == "delete") {
      await axios.delete(`${apiServer}${route}/${userID}`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
    updateTasks();
  }

  async function handleTaskDelete(event) {
    console.log(payload)
    event.preventDefault();
    const route = event.target.name+"Task";
    console.log(route);
    console.log(payload);
    // newPayload = {...payload}
    payload['userID'] = userID
    setPayload(payload);
    console.log(payload);
    await axios.delete(`${apiServer}deleteTask/${userID}`, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    updateTasks();
    handleTaskInfo(!showTaskInfo);
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newPayload = {...payload}
    newPayload[name] = value;
    setPayload(newPayload);
    // console.log(newPayload);
  }

  return(
    <div className="max-w-sm w-full bg-white lg:max-w-full mb-4">
      <div
        className="border border-white rounded-md shadow-lg p-4 flex flex-col justify-between leading-normal"
        onClick={() => handleTaskInfo(!showTaskInfo)}
      >
        <div className="my-2 flex items-center">
          <div className="text-gray-900 font-bold text-xl w-4/12">{`${task.title}`}</div>
          <div className="text-gray-700 text-base w-4/12">{`${task.category}`}</div>
          <div className=" text-sm text-gray-900 leading-none w-4/12">
            {task.time_started ? `${timeElapsed.format("HH:mm:ss")} / `: null} 
            {moment.utc().hours(Math.floor(task.estimated_time/60)).minutes(Math.floor(task.estimated_time%60)).seconds(0).format("HH:mm:ss")}
            </div>
        </div>
      </div>
      {
        showTaskInfo &&
        <div>
          <div className="border border-white rounded-md p-4 flex flex-col justify-between leading-normal">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-edit-task">
                Task Name
              </label>
              <input 
                name="title" 
                onChange={handleInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-edit-task"
                type="text"
                value={payload.title}
              />
            </div>
            <div className="w-3/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-edit-task">
                Category
              </label>
              <input
                name="category"
                onChange={handleInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-edit-task"
                type="text"
                value={payload.category}
              />
            </div>
            <div className="w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-edit-task">
                Est. Time (min)
              </label>
              <input
                name="estimated_time"
                onChange={handleInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-edit-task"
                type="number"
                value={payload.estimated_time}
              />
            </div>
          </div>
          <div className="flex justify-between px-6 py-4">
            <input
              name="update"
              type="submit"
              value="Update"
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded"
              onClick={handleTaskUpdate}
            />
            <input
              name="delete"
              type="submit"
              value="Delete"
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleTaskDelete}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default TaskCard;