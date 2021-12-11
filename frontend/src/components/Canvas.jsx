import { useRef, useEffect } from 'react'; //useRef allows us to get a dom element in React. Refs provide a way to access DOM nodes or React elements created in the render method
import './styles/Canvas.css';
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const Canvas = function(props) {
  // const {} = props;
  const fps = 30;
  const canvasRef = useRef(null);
  const ballRef = useRef({x: 700, y: 400, r: 10})
  var ballSpeedX = 10;
  var ballSpeedY = 10;
  
  const renderAll = (context, ball) => {
    createBoard(context);
    //ball
    context.save();
    context.beginPath(); //general routine for howd you fill any shape
    context.fillStyle = 'white';
    context.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI, true);
    context.fill(); //general routine for howd you fill any shape
    context.closePath();
    context.restore();
  };

  const createBoard = (context) => {
    //board
    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    //paddle 1
    context.fillStyle = 'white';
    context.fillRect((context.canvas.width - 1375), (context.canvas.height * .40), (context.canvas.width * .008), (context.canvas.height * .17));
    context.fill();

    //paddle 2
    context.fillStyle = 'white';
    context.fillRect((context.canvas.width - 35), (context.canvas.height * .40), (context.canvas.width * .008), (context.canvas.height * .17));
    context.fill();

  };

  const updateAll = function(context) {
    setInterval(function() {
      ballRef.current.x += ballSpeedX;
      ballRef.current.y += ballSpeedY;

      if (ballRef.current.x < 0) {
        ballSpeedX *= -1;
      }
      if (ballRef.current.x > context.canvas.width) {
        ballSpeedX *= -1;
      }

      if (ballRef.current.y < 0) {
        ballSpeedY *= -1;
      }
      if (ballRef.current.y > context.canvas.height) {
        ballSpeedY *= -1;
      }

      renderAll(context, ballRef.current);
    }, 1000/fps);
  };

  useEffect(()=> { //need a useEffect to control/trigger side effects for our components. We want to call/use this code after our Canvas component is rendered -> useEffect allows for this
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); //obtains the rendering context and its drawing functions
    
    createBoard(context)
    updateAll(context);

  }, []) //empty array says we only want to trigger this function once

  return(
    <canvas width="1400" height="800" id="game-board" ref={canvasRef}>
    </canvas>
  )
};

export default Canvas;