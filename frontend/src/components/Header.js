import React from 'react';
import {  useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory()

  function handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
    history.push(process.env.PUBLIC_URL + '/');
    window.location.reload();
  }

  return (
    <div className="flex justify-between items-center px-5">
      <img src="logo on white.svg" className="h-20 mb-4 w-auto mt-4"/>
      <div className="flex">
        <button 
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-3xl font-bold py-2 px-4 rounded"
          onClick={handleSignoutClick}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Header;
