import React, { useRef, useState, useEffect } from "react";
import Block from "./components/Block";
import ContextMenu from "./components/ContextMenu";
import context_data from './data/context-menu.json';

function App() {
  const [mouse_position, setMousePosition] = useState({ x: 0, y: 0 });

  const [connections, setConnections] = useState([]);
  const [connect_mode, setConnectMode] = useState(false);

  const [blocks, setBlocks] = useState([]);
  const [selected_block, selectBlock] = useState(null);

  const [background_color, setBackgroundColor] = useState("transparent");


  const initial_context_menu = {
    show: false,
    x: 0,
    y: 0,
    items: [
      {
        name: "", 
        func: function () {}, 
        enabled: false
      }
    ]
  }

  const [context_menu, setContextMenu] = useState(initial_context_menu);


  const contextMenuAsk = (class_name) => {
    const class_map = {
      "container": context_data.container,
      "Block": context_data.block
    }
  
    const function_map = {
      "spawnNewBlock": spawnNewBlock
    }
    const items = JSON.parse(JSON.stringify(class_map[class_name]));
    items.forEach((item) => {item.func = function_map[item.func]})

    return items
  }
  


const contextMenuHandler = (event) => {
  event.preventDefault();
  const mouse_position_x = mouse_position.x;
  const mouse_position_y= mouse_position.y;
  setContextMenu({show: true, x: mouse_position_x, y: mouse_position_y, items: contextMenuAsk(event.target.className.split(" ")[0])});
}

const spawnNewBlock = () => {
  const mouse_position_x = mouse_position.x;
  const mouse_position_y= mouse_position.y;

  const new_block = { x: mouse_position_x-50, y: mouse_position_y-50 };
  
  setBlocks([...blocks, new_block]);
};

// window.electron.receive('context-menu-command', (event, command) => {
//   // Handle the command (e.g., 'menu-item-1') here
//   spawnNewBlock();
// });


  const tempfunc = () => {
    console.log("chinga chunga, sab chunga?");
  }


  const drawLines = () => {

    
    // Get Variables
    
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    // Set Context Settings

    context.clearRect(0, 0, canvas.width, canvas.height);


    // Draws lines for every connection

    connections.forEach((connection) => {

      const input_rectangle = document
        .getElementById(connection.input)
        .getBoundingClientRect();


      const output_rectangle = document
        .getElementById(connection.output)
        .getBoundingClientRect();

      // Get's Co-ordinates

      var x1 = (input_rectangle.left + input_rectangle.width/2) > (output_rectangle.left + output_rectangle.width/2) ? input_rectangle.left - canvas.offsetLeft : input_rectangle.right - canvas.offsetLeft;
      var y1 = input_rectangle.top + input_rectangle.height/2 - canvas.offsetTop;

      var x2 = (input_rectangle.left + input_rectangle.width/2) > (output_rectangle.left + output_rectangle.width/2) ? output_rectangle.right - canvas.offsetLeft : output_rectangle.left - canvas.offsetLeft;
      var y2 = output_rectangle.top + output_rectangle.height/2 - canvas.offsetTop;
    


      var angle = Math.atan2(y2-y1,x2-x1);

      var head_length = 10;
      // Line
      context.beginPath();
      if (angle*180/Math.PI > 45 && angle*180/Math.PI < 135){
        x1 = input_rectangle.left + input_rectangle.width/2-canvas.offsetLeft;
        y1 = input_rectangle.bottom - canvas.offsetTop;
        x2 = output_rectangle.left + output_rectangle.width/2-canvas.offsetLeft;
        y2 = output_rectangle.top-canvas.offsetTop;
      }
      else if (angle*180/Math.PI > -135 && angle*180/Math.PI < -45) {
        x1 = input_rectangle.left + input_rectangle.width/2-canvas.offsetLeft;
        y1 = input_rectangle.top - canvas.offsetTop;
        x2 = output_rectangle.left + output_rectangle.width/2-canvas.offsetLeft;
        y2 = output_rectangle.bottom-canvas.offsetTop;
      }
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);

      context.lineWidth = 3;
      context.strokeStyle = "purple";
      context.globalAlpha  = 0.6;
      context.fillStyle = "transparent";

      context.stroke();

      var angle = Math.atan2(y2-y1,x2-x1);

      //Arrow
      context.beginPath();
      context.globalAlpha = 1;
      context.moveTo(x2, y2);
      context.lineTo(x2-head_length*Math.cos(angle-Math.PI/7),y2-head_length*Math.sin(angle-Math.PI/7));
      
      //path from the side point of the arrow, to the other side point
      context.lineTo(x2-head_length*Math.cos(angle+Math.PI/7),y2-head_length*Math.sin(angle+Math.PI/7));
      
      //path from the side point back to the tip of the arrow, and then again to the opposite side point
      context.lineTo(x2, y2);
      context.lineTo(x2-head_length*Math.cos(angle-Math.PI/7),y2-head_length*Math.sin(angle-Math.PI/7));
      context.stroke();
      
      context.fillStyle = "purple";
      context.fill();
    });};
  
  // const clearLines = () => {

  //   // Get Variables
  
  //   const canvas = document.querySelector("canvas");
  //   const context = canvas.getContext("2d");

  //   context.clearRect(0, 0, canvas.width, canvas.height);

  // }

  
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


  const mouseDownHandler = (event) => {
    const clicked_on_block = event.target.classList.contains("Block");
    if (clicked_on_block) {

      // Right Click
      if (event.button === 2) {
        
      } 

      // Middle Click
      else if (event.button === 1) {
      
        setConnectMode(true);
        selectBlock(event.target.id);

        setBackgroundColor("rgba(235, 235, 235, 0.8)");
      
      } 


      // Left Click
      else if (event.button === 0) {
        setBackgroundColor("rgba(235, 235, 235, 0.8)");
        // For Context Menu

      }

    }
    drawLines();

  };


  const mouseUpHandler = (event) => {

    const classList = event.target.classList;
    

      // Right Click
      if (event.button === 2) {
        if (classList.contains("Block")) {

        }
      }


      // Middle Click
      if (event.button === 1) {
        if (classList.contains("Block")) {
          if (connect_mode) {

            setConnectMode(false);
  
          }
  
          if (event.target.id !== selected_block && connect_mode) {
  
            handleNewConnection(selected_block, event.target.id);
          }
        }

      }


      // Left Click
      if (event.button === 0) {
        if (classList.contains("Block")) {
        }

      } 

      if (context_menu.show == true) {
        closeContextMenu();
      }

    drawLines();
    setBackgroundColor("transparent");
    
  };

  const closeContextMenu = (event) => {
    setContextMenu(initial_context_menu);
  };




  const container_ref = useRef(null);

  useEffect(() => {

    const updateCanvasSize = () => {

      const container = container_ref.current;
      const canvas = container.querySelector("canvas");

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

    };

    const updateMousePosition = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener("resize", updateCanvasSize);
    document.addEventListener("mousemove", updateMousePosition);

    updateCanvasSize(); // Initial call to set the size


    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      document.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);




  return (
    <>
    
    <div
      onContextMenu={contextMenuHandler}
      ref={container_ref}
      id="container"
      className="container"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: background_color,
      }}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      
    >
      {context_menu.show && <ContextMenu x={context_menu.x} y={context_menu.y} items={context_menu.items}/>}
      <canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}
      ></canvas>
      {blocks.map((block, index) => (
        <Block key={index} id={"Block"+index} x={block.x} y={block.y}/>
      ))}
        
    </div>
    </>
  );
};

export default App;
