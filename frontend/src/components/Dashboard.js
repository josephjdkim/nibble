import React, { useState, useEffect } from 'react';
import Header from './Header';
import ScheduleCardBlock from './ScheduleCardBlock';
import TaskCardBlock from './TaskCardBlock';
import NotesBlock from './NotesBlock';

function Dashboard() {
  const [signInStatus, setSignInStatus] = useState(false);

  useEffect(() => {
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus();
  }, [])

  function updateSigninStatus() {
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      setSignInStatus(true);
    }
  }

  return (
    <>
      {signInStatus ?
        <>
          <Header />
          <div className="flex justify-between w-full">
            <ScheduleCardBlock />
            <TaskCardBlock />
            <NotesBlock />
          </div> 
        </> 
      : 
        null}
    </>
  );
}

export default Dashboard;