import React, { useState } from 'react';

const DynamicButton = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleElement = () => {
    setShowDiv(prevState => !prevState);
  };

  const toggleDisable = () => {
    setIsDisabled(prevState => !prevState);
  };

  // Conditionally create the element
  const element = showDiv
    ? React.createElement(
        'div',
        { className: 'mt-4 p-4 bg-green-200' },
        'This is a ',
        React.createElement('strong', {}, 'div'),
        ' element.'
      )
    : React.createElement(
        'span',
        { className: 'mt-4 p-4 bg-yellow-200' },
        'This is a ',
        React.createElement('strong', {}, 'span'),
        ' element.'
      );

  return React.createElement(
    'div',
    { className: 'home-container' },
    React.createElement(
      'button',
      {
        onClick: toggleElement,
        className: 'px-4 py-2 bg-blue-500 text-white rounded-md',
        disabled: isDisabled, // Disable based on state
      },
      'Toggle Element'
    ),
    element,
    React.createElement(
      'button',
      {
        onClick: toggleDisable,
        className: 'mt-4 px-4 py-2 bg-red-500 text-white rounded-md',
      },
      isDisabled ? 'Enable Toggle Button' : 'Disable Toggle Button'
    ),
    React.createElement(
      'p',
      { className: 'mt-4 text-gray-700' },
      isDisabled ? 'Button Disabled' : 'Button Enabled'
    )
  );
};

export default DynamicButton;
