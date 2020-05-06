import React, { useReducer, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
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
  
  const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || config.clientId;
  const API_KEY = process.env.GOOGLE_API_KEY || config.apiKey;

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
      setState({
        error: true,
        loaded: true,
        fetching: false,
      })
    }, function(error) {
      console.log(error);
    });
  }

  useEffect(() => {
    handleClientLoad();
  }, [])

  return (
    <div className="App w-full nibbleTheme">
      {/* <Home /> */}
      {state.loaded ?
      <>
        <Router>
          <Switch>
            <Route exact path={'/'} children={<Home />} />
            <Route exact path={"/dashboard"} children={<Dashboard />} />
          </Switch>
        </Router>

      </>
      : null}
    </div>
  );
}

export default App;
