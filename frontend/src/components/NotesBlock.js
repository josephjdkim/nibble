import React, { useReducer, useEffect } from 'react';
import HeaderText from "./HeaderText";
import axios from 'axios';

function NotesBlock() {
  const apiServer = 'http://localhost:5001/';

  // const initialState = {
  //   data: null,
  //   error: null,
  //   loaded: false,
  //   fetching: false,
  // }
  // const reducer = (state, newState) => ({ ...state, ...newState })
  // const [state, setState] = useReducer(reducer, initialState);

  // async function loadTasks() {
  //   if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
  //     const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId().toString();
  //     console.log(`${apiServer}getTasks/${userID}`)
  //     const response = await axios.get(`${apiServer}getTasks/${userID}`)
  //     const { data, status } = {
  //       data: response.data,
  //       status: response.status
  //     }
      
  //     // error? 
  //     if (status !== 200) {
  //       return setState({
  //         data,
  //         error: true,
  //         loaded: true,
  //         fetching: false,
  //       })
  //     }

  //     // no error 
  //     setState({
  //       data,
  //       error: null,
  //       loaded: true,
  //       fetching: false,
  //     })
  //   }
  // }

  // useEffect(() => {
  //   window.gapi.auth2.getAuthInstance().isSignedIn.listen(loadTasks);
  //   // Handle the initial sign-in state.
  //   loadTasks();
  // }, [])

  return (
    <div className="container w-1/3">
      <div className="container flex items-center">
        <HeaderText title="Notes"/>
      </div>
      <textarea 
        className="shadow-inner p-4 rounded-md w-full h-full" 
        placeholder="Write some notes..." 
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
}

export default NotesBlock;