import React, { useReducer, useEffect, Fragment } from 'react';
import ScheduleCardBlock from './components/ScheduleCardBlock';
import TaskCardBlock from './components/TaskCardBlock';
import config from './apiGoogleConfig.json';
import './App.css';
import './tailwind.css'

function App() {
  const initialState = {
    error: null,
    loaded: false,
    fetching: false,
  }
  const reducer = (state, newState) => ({ ...state, ...newState })
  const [state, setState] = useReducer(reducer, initialState);
  
  const CLIENT_ID = config.clientId;
  const API_KEY = config.apiKey;

  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = config.discoveryDocs;

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = config.scope;

  /**
   *  On load, called to load the auth2 library and API client library.
   */
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
    }).then(function () {
      return setState({
        error: true,
        loaded: true,
        fetching: false,
      })
      console.log("worked")
    }, function(error) {
      console.log(error);
    });
  }

  useEffect(() => {
    handleClientLoad();
  }, [])

  return (
    <div className="container m-auto App w-full">
      <img src="logo on white.svg" className="w-1/5 mb-4"/>
      <div className="flex justify-between">
        {state.loaded ? 
        <Fragment>
          <ScheduleCardBlock />
          <TaskCardBlock /> 
        </Fragment>
        : null}
      </div>
    </div>
  );
}

export default App;
