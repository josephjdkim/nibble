import React, { useReducer, useEffect } from 'react';
import ScheduleCard from './ScheduleCard';
import HeaderText from './HeaderText';

import './ScheduleCardBlock.css';

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
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    const minDate = (new Date()).toISOString();
    let maxDate= (new Date());
    maxDate.setDate(maxDate.getDate() + 7);
    maxDate = maxDate.toISOString();
    window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': minDate,
      'timeMax': maxDate,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 20,
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
    <div className="container w-1/3 schedTheme">
      <HeaderText title="Schedule"/>
      <div className="p-6 rounded-md overflow-y-scroll schedBody" style={{height: "76vh"}}>
        {state.loaded ? state.data.result.items.map(cur => {
          return <ScheduleCard key={cur.id} event={cur}/>
        }) : null}
      </div>
    </div>
  );
}

export default ScheduleCardBlock;