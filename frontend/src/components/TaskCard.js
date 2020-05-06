import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function TaskCard({task, updateTasks}) {
  const apiServer = process.env.NODE_ENV === 'production' ? 'https://nibble-productivity.herokuapp.com/' : 'http://localhost:5001/';
  const [showTaskInfo, handleTaskInfo] = useState(false);
  const [payload, setPayload] = useState({...task})
  const [timeStarted, setTimeStarted] = useState(false)

  const currentTime = moment().utc();
  const startedTime = task.time_started ? moment(task.time_started) : moment().utc();
  const timeDiff = moment.utc(moment(currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(startedTime,"DD/MM/YYYY HH:mm:ss")));
  const [timeElapsed, setTimeElapsed] = useState(timeDiff);
  const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
  
  useEffect(() => {
    if (task.time_started) {
      setTimeStarted(true);
    }
    if (timeStarted) {
      const interval = setInterval(() => {
        if (!isNaN(timeElapsed._i)) {
          setTimeElapsed(timeElapsed => moment(timeElapsed).add(1, 'seconds'));
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timeStarted])

  async function handleTask(event) {
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
      await axios.delete(`${apiServer}${route}/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: payload
      })
    }
    handleTaskInfo(!showTaskInfo);
    updateTasks();
  }

  async function startTask(event) {
    event.preventDefault();
    const route = "startTask";
    payload['userID'] = userID
    setPayload(payload);
    await axios.put(`${apiServer}${route}/${userID}`, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    setTimeStarted(true);
    updateTasks();
    handleTaskInfo(!showTaskInfo);
  }

  async function endTask(event) {
    event.preventDefault();
    const route = "endTask";
    payload['userID'] = userID
    setPayload(payload);
    await axios.put(`${apiServer}${route}/${userID}`, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    setTimeStarted(false);
    handleTaskInfo(!showTaskInfo);
    updateTasks();
  }

  // async function handleTaskDelete(event) {
  //   console.log(payload)
  //   event.preventDefault();
  //   const route = event.target.name+"Task";
  //   console.log(route);
  //   console.log(payload);
  //   // newPayload = {...payload}
  //   payload['userID'] = userID
  //   setPayload(payload);
  //   console.log(payload);
  //   await axios.delete(`${apiServer}deleteTask/${userID}`, JSON.stringify(payload), {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //   updateTasks();
  //   handleTaskInfo(!showTaskInfo);
  // }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newPayload = {...payload}
    newPayload[name] = value;
    setPayload(newPayload);
  }

  return(
    <div className="max-w-sm w-full rounded-lg bg-white lg:max-w-full mb-4 shadow-lg">
      <div
        className="p-4 flex flex-col justify-between leading-normal"
        onClick={() => handleTaskInfo(!showTaskInfo)}
      >
        <div className="my-2 flex items-center justify-between">
          <div className="text-gray-900 font-bold text-xl w-4/12">{`${task.title}`}</div>
          <div className="text-gray-700 text-base w-2/12">{`${task.category}`}</div>
          <div className="text-sm text-gray-900 leading-none w-4/12">
            {timeStarted && !task.time_finished ? `${timeElapsed.format("HH:mm:ss")} / `: null}
            {task.time_finished ? `${moment.utc(moment(moment(task.time_finished),"DD/MM/YYYY HH:mm:ss").diff(moment(startedTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")} / ` : null}
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
              <div className="flex items-start justify-between w-full">
                <input 
                  name="title" 
                  onChange={handleInputChange}
                  className="appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-edit-task"
                  type="text"
                  value={payload.title}
                />
                {!task.time_finished ? task.time_started ? 
                  <div 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    onClick={endTask}
                  >
                    End
                  </div> 
                :
                  <div 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    onClick={startTask}
                  >
                    Start
                  </div> : null}
              </div>
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
              type="button"
              value="Update"
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded"
              onClick={handleTask}
            />
            <input
              name="delete"
              type="button"
              value="Delete"
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleTask}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default TaskCard;