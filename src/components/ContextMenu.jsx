import React from 'react';

const ContextMenu = ({ x,  y }) => {



  return (
    <div className="ContextMenu" style={{transform: `translate(${x}px, ${y}px)`, position: 'absolute', zindex: 1}}>

    <ul>
      <li><div></div></li>
      <li><div></div></li>
      <li><div></div></li>
    </ul>

    </div>
  );
};

export default ContextMenu;
