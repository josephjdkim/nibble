import React from 'react';

function CalendarCard({name = "Hooks"}) {
  const handleClick = () => {
    console.log("helloooooo")
  }
  
  return <div> 
      Hello {name} 
      <button onClick={handleClick}>Click me! </button>
    </div>
}

export default CalendarCard;