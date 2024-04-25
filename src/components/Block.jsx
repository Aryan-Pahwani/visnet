import React from 'react';
import Draggable from 'react-draggable';

const Block = ({ color = "black", id }) => {
  const handleStart = (event) => {
    // If the target is not the main component, prevent dragging
    if (event.target.id !== id) {
      return false;
    }
  };

  return (
    <Draggable bounds="parent" onStart={handleStart}>
      <div className='Block' id={id}>
      </div>
    </Draggable>
  );
};

export default Block;
