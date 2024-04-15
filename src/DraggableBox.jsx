import React from 'react';
import Draggable from 'react-draggable';

class DraggableBox extends React.Component {
  render() {
    return (
      <Draggable bounds="parent">
        <div style={{ width: '100px', height: '100px', backgroundColor: 'black' }}>
          
        </div>
      </Draggable>
    );
  }
}

export default DraggableBox;
