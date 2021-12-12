import { useRef, useEffect } from 'react'; //useRef allows us to get a dom element in React. Refs provide a way to access DOM nodes or React elements created in the render method
import './styles/Canvas.css';
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const Canvas = function(props) {
  // const {} = props;
  // const fps = 30;
  const canvasRef = useRef(null);
  const ballRef = useRef({x: 700, y: 400, r: 10});
  const paddleRRef = useRef({x: 1360, y: 320, w: 11.2, h:136 })
  let ballSpeedX = 15;
  let ballSpeedY = 7;
  let paddleSpeedY = 7;
  console.log(paddleRRef)

  const createBoard = (context, ball, paddle) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    //ball
    context.beginPath(); //general routine for howd you fill any shape
    context.fillStyle = 'white';
    context.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI, true);
    context.fill(); //general routine for howd you fill any shape

    //paddle 1
    context.fillStyle = 'white';
    context.fillRect((context.canvas.width - 1375), (context.canvas.height * .40), (context.canvas.width * .008), (context.canvas.height * .17));
    context.fill();

    //paddle 2
    context.fillStyle = 'white';
    context.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    context.fill();
  
  };

  const updateBall = function(context, ball) {
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    if (ball.x - ball.r  <= 0) {
      ballSpeedX *= -1;
      ball.x = ball.r;
    }

    if (ball.x + ball.r >= context.canvas.width) {
      ballSpeedX *= -1;
      ball.x = context.canvas.width - ball.r;
    }

    if (ball.y - ball.r  <= 0) {
      ballSpeedY *= -1;
      ball.y = ball.r;
    }
    if (ball.y + ball.r >= context.canvas.height) {
      ballSpeedY *= -1;
      ball.y = context.canvas.height - ball.r;
    }
  };

  const updatePaddleR = function(context, paddle) {
    paddle.y += paddleSpeedY;

    if (paddle.y >= context.canvas.height-136) {
      paddleSpeedY *= -1;
    }

    if (paddle.y <= 0) {
      paddleSpeedY *= -1;
    }
  };

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); //obtains the rendering context and its drawing functions
    updateBall(context, ballRef.current);
    updatePaddleR(context, paddleRRef.current);
    createBoard(context, ballRef.current, paddleRRef.current);
    requestAnimationFrame(render);
  }

  useEffect(()=> { //need a useEffect to control/trigger side effects for our components. We want to call/use this code after our Canvas component is rendered -> useEffect allows for this

    render();

  }, []) //empty array says we only want to trigger this function once

  return(
    <canvas width="1400" height="800" id="game-board" ref={canvasRef}>
    </canvas>
  )
};

export default Canvas;