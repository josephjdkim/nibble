import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory()

  function handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
    history.push('/');
    window.location.reload();
  }

  return (
    <div className="flex justify-between items-center px-5">
      <img src="logo on white.svg" className="h-20 mb-4 w-auto"/>
      <div className="flex">
        <button onClick={handleSignoutClick}>Sign Out</button>
      </div>
    </div>
  );
}

export default Header;
