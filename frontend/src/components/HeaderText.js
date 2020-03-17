import React from 'react';

function HeaderText({title = "Header"}) {
  
  return (
    <div> 
      <h2 className="text-4xl mb-2 mr-2">{title}</h2>
    </div>
  )
}

export default HeaderText;