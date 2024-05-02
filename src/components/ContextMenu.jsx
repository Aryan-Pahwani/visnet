import React from "react";

const ContextMenu = ({ x, y, items }) => {

  return (
    <div
      className="ContextMenu"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {items.map((item, index) =>
        item.enabled ? (
          <div
            onMouseDown={item.func}
            key={index}
            id={item.name}
            className="context-item"
          >
            {item.name}
          </div>
        ) : (
          <div
            key={index}
            id={item.name}
            className="context-item disabled"
          >
            {item.name}
          </div>
        )
      )}
    </div>
  );
};

export default ContextMenu;
