import { useRef, useEffect } from 'react'; //useRef allows us to get a dom element in React. Refs provide a way to access DOM nodes or React elements created in the render method
import './styles/Canvas.css';
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const Canvas = function(props) {
  // const {} = props;
  const fps = 30;
  const canvasRef = useRef(null);
  const createBoard = (context) => {
    //board
    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    //ball
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(700, 400, 10, 0, 2*Math.PI, true);
    context.fill();

    //paddle 1
    context.fillStyle = 'white';
    context.fillRect((context.canvas.width - 1375), (context.canvas.height * .40), (context.canvas.width * .008), (context.canvas.height * .17));
    context.fill();

    //paddle 2
    context.fillStyle = 'white';
    context.fillRect((context.canvas.width - 35), (context.canvas.height * .40), (context.canvas.width * .008), (context.canvas.height * .17));
    context.fill();

  };

  useEffect(()=> { //need a useEffect to control/trigger side effects for our components. We want to call/use this code after our Canvas component is rendered -> useEffect allows for this
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); //obtains the rendering context and its drawing functions
    createBoard(context);
  }, []) //empty array says we only want to trigger this function once

  return(
    <canvas width="1400" height="800" id="game-board" ref={canvasRef}>
    </canvas>
  )
};

export default Canvas;