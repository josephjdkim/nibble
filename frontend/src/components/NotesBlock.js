import React, { useState, useReducer, useEffect } from 'react';
import HeaderText from "./HeaderText";
import axios from 'axios';

import './NotesBlock.css';

function NotesBlock() {
  const apiServer = 'http://localhost:5001/';
  const [payload, setPayload] = useState({});

  async function onInputChange(event) {
    console.log(payload);
    const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    setState({
      data: event.target.value
    });
    payload['userID'] = userID;
    payload['note'] = event.target.value;
    setPayload(payload);
    console.log(payload);
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
      {state.loaded ?
      <textarea 
        className="shadow-inner p-4 rounded-md w-full h-full" 
        placeholder="Write some notes..." 
        value={state.data[0].content}
        onChange={onInputChange}
      /> : null}
    </div>
  );
}

export default NotesBlock;