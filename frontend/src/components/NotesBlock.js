import React, { useState, useReducer, useEffect } from 'react';
import HeaderText from "./HeaderText";
import axios from 'axios';

import './NotesBlock.css';

function NotesBlock() {
  const apiServer = process.env.NODE_ENV === 'production' ? 'https://nibble-productivity.herokuapp.com/' : 'http://localhost:5001/';
  const [payload, setPayload] = useState({});

  async function onInputChange(event) {
    const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    setState({
      data: event.target.value
    });
    payload['userID'] = userID;
    payload['note'] = event.target.value;
    setPayload(payload);
    await axios.put(`${apiServer}updateNotes/${userID}`, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  const initialState = {
    data: null,
    error: null,
    loaded: false,
    fetching: false,
  }
  const reducer = (state, newState) => ({ ...state, ...newState })
  const [state, setState] = useReducer(reducer, initialState);

  async function getNotes() {
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId().toString();
      const response = await axios.get(`${apiServer}getNotes/${userID}`)
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
    getNotes();
  }, [])

  return (
    <div className="container w-1/3 notesTheme">
      <div className="container flex items-center">
        <HeaderText title="Notes"/>
      </div>
      <div className="p-6 rounded-md overflow-y-scroll schedBody" style={{height: "76vh"}}>
        {state.loaded ?
        <textarea 
        className="shadow-inner p-4 rounded-md w-full h-full" 
        style={{height: "74vh"}}
        placeholder="Write some notes..." 
        value={state.data.content}
        onChange={onInputChange}
        /> : null}
      </div>
    </div>
  );
}

export default NotesBlock;