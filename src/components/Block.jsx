import { useRef, React} from 'react';
import Draggable from 'react-draggable';

const Block = ({ color = "black", id, x=0, y=0 }) => {
  
  // Fixes deprecation warning in React Strictmode
  // https://github.com/react-grid-layout/react-draggable/blob/master/CHANGELOG.md#440-may-12-2020
  //
  const nodeRef = useRef(null);


  const handleStart = (event) => {
    // If the target is not the main component, prevent dragging
    if (event.target.id !== id) {
      return false;
    }
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" onStart={handleStart} defaultPosition={{x: x, y: y}}>
      <div ref={nodeRef} className='Block' id={id} style={{top: 0, left: 0, position: 'absolute'}} >
      </div>
    </Draggable>
  );
};

export default Block;
