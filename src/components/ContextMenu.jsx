import React from 'react';

const ContextMenu = ({ x, y, items }) => {
  // Only render the menu if there are items
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="ContextMenu" style={{
      width: '150px',
      transform: `translate(${x}px, ${y}px)`,
      position: 'absolute',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFF',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      borderRadius: '8px',
      overflow: 'hidden',
      border: 'none'
    }}>
      {items.map((item, index) => (
        <div key={index} className="context-item" style={{
          padding: '8px 12px',
          borderBottom: items.length - 1 !== index ? '1px solid #EAEAEA' : 'none',
          fontSize: '14px',
          color: '#333',
          backgroundColor: index % 2 === 0 ? '#F9F9F9' : 'transparent',
          fontWeight: '500',
          cursor: 'pointer'
        }} onClick={() => item.itemFunction(item.itemFunctionParameters)}>
          {item.itemName}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
