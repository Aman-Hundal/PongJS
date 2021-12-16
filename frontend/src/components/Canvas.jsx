import { useRef, useEffect } from 'react'; //useRef allows us to get a dom element in React. Refs provide a way to access DOM nodes or React elements created in the render method
import './styles/Canvas.css';
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const Canvas = function(props) {
  // const {} = props;
  // const fps = 30;
  const canvasRef = useRef(null);
  const ballRef = useRef({x: 700, y: 400, r: 10, speedX: 15, speedY: 7});
  const paddleRRef = useRef({x: 1360, y: 320, w: 11.2, h: 136, speedY: 7 })
  const paddleLRef = useRef({x: 25, y: 320, w: 11.2, h: 136, speedY: 20 })
  console.log(paddleRRef)

  const createBoard = (context, ball, rightPaddle, leftPaddle) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    //ball
    context.beginPath(); //general routine for howd you fill any shape
    context.fillStyle = 'white';
    context.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI, true);
    context.fill(); //general routine for howd you fill any shape

    //paddle 1
    context.fillStyle = 'white';
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
    context.fill();

    //paddle 2
    context.fillStyle = 'white';
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);
    context.fill();
  
  };

  const updateBall = function(context, ball) {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x - ball.r  <= 0) {
      ball.speedX *= -1;
      ball.x = ball.r;
    }

    if (ball.x + ball.r >= context.canvas.width) {
      ball.speedX *= -1;
      ball.x = context.canvas.width - ball.r;
    }

    if (ball.y - ball.r  <= 0) {
      ball.speedY *= -1;
      ball.y = ball.r;
    }
    if (ball.y + ball.r >= context.canvas.height) {
      ball.speedY *= -1;
      ball.y = context.canvas.height - ball.r;
    }
  };

  const updatePaddleR = function(context, paddle) {
    paddle.y += paddle.speedY;

    if (paddle.y >= context.canvas.height-136) {
      paddle.speedY *= -1;
    }

    if (paddle.y <= 0) {
      paddle.speedY *= -1;
    }
  };

  const moveLeftPaddle = (paddle, key) => {
    
    if (key === "s" && paddle.y !== 660) {
      paddle.y += paddle.speedY;
    }

    if (key === "w" && paddle.y !== 0) {
      paddle.y -= paddle.speedY;
    }
  

  }

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); //obtains the rendering context and its drawing functions
    updateBall(context, ballRef.current);
    updatePaddleR(context, paddleRRef.current);
    createBoard(context, ballRef.current, paddleRRef.current, paddleLRef.current);
    requestAnimationFrame(render);
  }

  useEffect(()=> { //need a useEffect to control/trigger side effects for our components. We want to call/use this code after our Canvas component is rendered -> useEffect allows for this

    render();

  }, []) //empty array says we only want to trigger this function once

  return(
    <canvas width="1400" height="800" id="game-board" ref={canvasRef} tabIndex="0" onKeyDown={event => moveLeftPaddle(paddleLRef.current, event.key)}>
    </canvas>
  )
};

export default Canvas;