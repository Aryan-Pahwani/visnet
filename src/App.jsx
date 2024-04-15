import './App.css';
import React from 'react';
import DraggableBox from './DraggableBox';

function App() {
  return (
    <>
      <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
      <DraggableBox id="Box1"></DraggableBox>
      <DraggableBox id="Box2"></DraggableBox>
      <DraggableBox id="Box3"></DraggableBox>
      </div>
    </>
  );
};

export default App;