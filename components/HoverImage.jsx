'use client';

import React from 'react';

const HoverImage = () => {
function handleMouseOver(e) {
    e.target.setAttribute('src', '/assets/images/AI Prompts.png');
    e.target.setAttribute('alt', 'Updated image');
  }

  // Function to handle mouse out event (optional)
  function handleMouseOut(e) {
    e.target.setAttribute('src', '/assets/images/About Us.jpg');
    e.target.setAttribute('alt', 'Original image');
  }
  return(
  <img className="mt-[60px]"
        src="/assets/images/About Us.jpg"
        alt="kitty"
        onMouseOver={handleMouseOver} // Event handler for mouse over
        onMouseOut={handleMouseOut}   // Event handler for mouse out (optional)
        //style={{ width: '300px', height: 'auto' }} // Optional: styling for better visibility
      />
  )
}
export default HoverImage;
