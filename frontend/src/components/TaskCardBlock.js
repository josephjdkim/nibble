import React, { useReducer, useEffect } from 'react';
import TaskCard from './TaskCard';
import HeaderText from './HeaderText';
import CreateTaskButton from './CreateTaskButton';
import axios from 'axios';

function TaskCardBlock() {
  const apiServer = 'http://localhost:5001/';

  const CLIENT_ID = '1091433185202-qksll2sqmv2i59b1tbhqh2d9j87h68sn.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAMscLvQ3SjBd_x3XH7TQ-XlfqUnAld35s';

  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const initialState = {
    data: null,
    error: null,
    loaded: false,
    fetching: false,
  }
  const reducer = (state, newState) => ({ ...state, ...newState })
  const [state, setState] = useReducer(reducer, initialState);

  function handleClientLoad() {
    window.gapi.load('client:auth2', initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(async function () {
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
    }, function(error) {
      console.log(error)
    });
  }

  useEffect(() => {
    handleClientLoad();
  }, [])

  return (
    <div className="container w-3/5">
      <div className="container flex">
        <HeaderText title="Tasks"/>
        <CreateTaskButton updateTasks={initClient}/>
      </div>
      {state.loaded ? state.data.map(cur => {
        return <TaskCard task={cur}/>
      }) : null}
    </div>
  );
}

export default TaskCardBlock;