import React, { useRef, useState, useEffect } from "react";
import Block from "./components/Block";


function App() {

  const [connections, setConnections] = useState([]);
  const [connect_mode, setConnectMode] = useState(false);

  const [my_block, setMyBlock] = useState(null);

  const [background_color, setBackgroundColor] = useState("transparent");


  const initial_context_menu = {
    show: false,
    x: 0,
    y: 0
  }

  const [context_menu, setContextMenu] = useState(initial_context_menu);



const contextMenuHandler = (event) => {
  event.preventDefault();
  window.electron.send('show-context-menu');
}

window.electron.receive('context-menu-command', (event, command) => {
  // Handle the command (e.g., 'menu-item-1') here
  setContextMenu();
});



  // Draw Lines

  const drawLines = () => {

    
    // Get Variables
    
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    // Set Context Settings

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "green";
    context.lineWidth = 1;

    // Draws lines for every connection

    connections.forEach((connection) => {

      const input_rectangle = document
        .getElementById(connection.input)
        .getBoundingClientRect();


      const output_rectangle = document
        .getElementById(connection.output)
        .getBoundingClientRect();

      // Get's Co-ordinates

      const x1 = input_rectangle.left + input_rectangle.width / 2 - canvas.offsetLeft;
      const y1 = input_rectangle.top + input_rectangle.height / 2 - canvas.offsetTop;

      const x2 = output_rectangle.left + output_rectangle.width / 2 - canvas.offsetLeft;
      const y2 = output_rectangle.top + output_rectangle.height / 2 - canvas.offsetTop;

      // Moves

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();


    });};
  
    // Clears current Canvas context
    const clearLines = () => {

      // Get Variables
    
      const canvas = document.querySelector("canvas");
      const context = canvas.getContext("2d");

      context.clearRect(0, 0, canvas.width, canvas.height);

    }

  // Handles new Connection
  
  const handleNewConnection = (input, output) => {
    const new_connection = { input, output };

    const does_connection_already_exist = connections.some(
      (connection) =>
        connection.input === new_connection.input &&
        connection.output === new_connection.output
    );

    if (!does_connection_already_exist) {
      setConnections((prev_connections) => [...prev_connections, new_connection]);
    }
  };


  // MOUSE DOWN HANDLER //

  const mouseDownHandler = (event) => {
    
    const clicked_on_block = event.target.classList.contains("Block");
    if (clicked_on_block) {

      // Right Click
      if (event.button === 2) {
        
      } 

      // Middle Click
      else if (event.button === 1) {
      
        setConnectMode(true);
        setMyBlock(event.target.id);

        setBackgroundColor("rgba(235, 235, 235, 0.8)");
      
      } 


      // Left Click
      else if (event.button === 0) {

        setBackgroundColor("rgba(235, 235, 235, 0.8)");
      
      }

      drawLines();

    }
  };

  // MOUSE UP HANDLER //

  const mouseUpHandler = (event) => {

    const clicked_on_block = event.target.classList.contains("Block");
    if (clicked_on_block) {

      // Right Click
      if (event.button === 2) {
        
      }


      // Middle Click
      if (event.button === 1) {


        if (connect_mode) {

          setConnectMode(false);

        }

        if (event.target.id !== my_block && connect_mode) {

          handleNewConnection(my_block, event.target.id);
          drawLines();
        }

      }


      // Left Click
      if (event.button === 0) {



        }


    } 
    drawLines();
    setBackgroundColor("transparent");
    
  };







  const container_ref = useRef(null);

  useEffect(() => {

    const updateCanvasSize = () => {

      const container = container_ref.current;
      const canvas = container.querySelector("canvas");

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize(); // Initial call to set the size

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);




  return (
    <div
      onContextMenu={contextMenuHandler}
      ref={container_ref}
      id="container"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: background_color,
      }}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      
    >
      <canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></canvas>

      <Block id="Block1" />
      <Block id="Block2" />
      <Block id="Block3" />

    </div>
  );
};

export default App;
