import React from 'react';
import { useHistory, Link } from "react-router-dom";
import './Home.css';

function Home() {
  const history = useHistory();

  function handleAuthClick(event) {
    console.log(window.gapi.auth2.getAuthInstance());
    window.gapi.auth2.getAuthInstance().signIn();
    history.push(process.env.PUBLIC_URL + "/dashboard")
  }

  function handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
    window.location.reload();
  }

  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <img src="logo on dark.png" />
          </div>
          <div className="nav-buttons">
            {window.gapi.auth2.getAuthInstance().isSignedIn.get() ?
              <>
                <button><Link to={process.env.PUBLIC_URL + "/dashboard"}>Dashboard</Link></button>
                <button onClick={handleSignoutClick}>Sign Out</button> 
              </>
              :
              <button onClick={handleAuthClick}>Sign In</button>
            }
          </div>
        </div>
      </nav>

      <div className="nav-extension">
        <div className="extension-content">
          <div className="extension-header">
            Nibble makes it easier for you to 
            plan your daily tasks around your schedule.
          </div>
          <div className="extension-info">
            Take advantage of features such as Google calendar sync,
            timing tasks, setting goals, and viewing your productivity on
            a user dashboard to plan out your tasks daily and increase
            your productivity!
          </div>
          <button className="green-button" onClick={handleAuthClick}>
            Get Started Today!
          </button>
        </div>
        <div className="extension-picture">
          <img src="top_image.svg" />
        </div>
      </div>

      <div className="alternating-blocks">
        <div className="img-text-block">
          <div className="text-block">
            <div className="text-block-header">Plan out your schedule</div>
            <div className="text-block-content">
              Check your Google calendar to see your tasks for the day
              or the week and create tasks accordingly 
            </div>
          </div>
          <div className="image-block">
            <img src="plan_schedule.svg" />
          </div>
        </div>
        <div className="img-text-block">
          <div className="text-block">
            <div className="text-block-header">Create Goals</div>
            <div className="text-block-content">
              Decide your goals of the week based off your tasks
              and mark them off one by one 
            </div>
          </div>
          <div className="image-block">
            <img src="create_goals.svg" />
          </div>
        </div>
        <div className="img-text-block">
          <div className="text-block">
            <div className="text-block-header">Time your tasks</div>
            <div className="text-block-content">
              See how long your tasks take and keep track of
              how much time you spent on each one
            </div>
          </div>
          <div className="image-block">
            <img src="time_tasks.svg" />
          </div>
        </div>
        <div className="bottom-text">
          Start Nibbling Through Your Work!
          <button className="green-button" onClick={handleAuthClick}>Get Started Today!</button>
        </div>
      </div>
      <footer>
        <img className="logo-bottom" src="logo on white.png" />
        © Copyright 2020. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;