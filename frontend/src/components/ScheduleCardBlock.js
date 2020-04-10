import React, { useReducer, useEffect } from 'react';
import ScheduleCard from './ScheduleCard';
import HeaderText from './HeaderText';

function ScheduleCardBlock() {
  const initialState = {
    data: null,
    error: null,
    loaded: false,
    fetching: false,
  }
  const reducer = (state, newState) => ({ ...state, ...newState })
  const [state, setState] = useReducer(reducer, initialState);

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus() {
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      // authorizeButton.style.display = 'none';
      // signoutButton.style.display = 'block';
      listUpcomingEvents();
    } else {
      // authorizeButton.style.display = 'block';
      // signoutButton.style.display = 'none';
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    console.log(window.gapi.auth2.getAuthInstance());
    window.gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      const { data, status } = {
        data: response,
        status: response.status
      }
      if (status !== 200) {
        return setState({
          data,
          error: true,
          loaded: true,
          fetching: false,
        })
      }
      setState({
        data,
        error: null,
        loaded: true,
        fetching: false,
      })
    });
  }

  useEffect(() => {
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus();
  }, [])


  // const { error, data } = state
  return (
    <div className="container w-1/3">
      <HeaderText title="Schedule"/>
      <button onClick={handleAuthClick}>Authorize</button>
      <button onClick={handleSignoutClick}>Sign Out</button>
      <div className="shadow-inner p-4 rounded-md overflow-y-scroll" style={{height: "550px"}}>
        {state.loaded ? state.data.result.items.map(cur => {
          return <ScheduleCard key={cur.id} event={cur}/>
        }) : null}
      </div>
    </div>
  );
}

export default ScheduleCardBlock;