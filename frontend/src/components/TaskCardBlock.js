import React, { useReducer, useEffect } from 'react';
import TaskCard from './TaskCard';
import HeaderText from './HeaderText';
import CreateTaskButton from './CreateTaskButton';
import axios from 'axios';

import './TaskCardBlock.css';

function TaskCardBlock() {
  const apiServer = 'http://localhost:5001/';

  const initialState = {
    data: null,
    error: null,
    loaded: false,
    fetching: false,
  }
  const reducer = (state, newState) => ({ ...state, ...newState })
  const [state, setState] = useReducer(reducer, initialState);

  async function loadTasks() {
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId().toString();
      console.log(`${apiServer}getTasks/${userID}`)
      const response = await axios.get(`${apiServer}getTasks/${userID}`)
      const { data, status } = {
        data: response.data,
        status: response.status
      }
      
      // error? 
      if (status !== 200) {
        return setState({
          data,
          error: true,
          loaded: true,
          fetching: false,
        })
      }

      // no error 
      setState({
        data,
        error: null,
        loaded: true,
        fetching: false,
      })
    }
  }

  useEffect(() => {
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(loadTasks);
    // Handle the initial sign-in state.
    loadTasks();
  }, [])

  return (
    <div className="container w-2/5 taskTheme">
      <div className="container flex items-center justify-between">
        <HeaderText title="Tasks"/>
        <CreateTaskButton updateTasks={loadTasks}/>
      </div>
      <div className="shadow-inner p-4 rounded-md overflow-y-scroll">
        {state.loaded ? state.data.map(cur => {
          return <TaskCard key={cur.id} task={cur}/>
        }) : null}
      </div>
    </div>
  );
}

export default TaskCardBlock;