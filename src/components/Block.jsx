import React from 'react';
import Draggable from 'react-draggable';

const Block = ({ color = "black", id, top=0, left=0 }) => {
  const handleStart = (event) => {
    // If the target is not the main component, prevent dragging
    if (event.target.id !== id) {
      return false;
    }
  };

  return (
    <Draggable bounds="parent" onStart={handleStart} defaultPosition={{x: left, y: top}}>
      <div className='Block' id={id} style={{top: 0, left: 0, position: 'absolute'}} >
      </div>
    </Draggable>
  );
};

export default Block;
