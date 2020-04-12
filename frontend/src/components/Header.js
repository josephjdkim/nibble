import React from 'react';

function Header() {

  function handleAuthClick(event) {
    console.log(window.gapi.auth2.getAuthInstance());
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <div className="flex justify-between items-center">
      <img src="logo on white.svg" className="w-1/5 mb-4"/>
      <div className="flex">
        {window.gapi.auth2.getAuthInstance().isSignedIn.get() ?
          <button onClick={handleSignoutClick}>Sign Out</button> :
          <button onClick={handleAuthClick}>Authorize</button>
        }
      </div>
    </div>
  );
}

export default Header;
