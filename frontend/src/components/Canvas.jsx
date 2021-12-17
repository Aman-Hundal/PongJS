import { useRef, useEffect } from 'react'; //useRef allows us to get a dom element in React. Refs provide a way to access DOM nodes or React elements created in the render method
import './styles/Canvas.css';
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const Canvas = function(props) {
  // const {} = props;
  // const fps = 30;
  const canvasRef = useRef(null);
  const ballRef = useRef({x: 700, y: 400, r: 10, vx: 5, vy: 0, speed: 5}); //speed 10 best, 14 max, 7 slow, 20 super
  const paddleRRef = useRef({x: 1355, y: 320, w: 11.2, h: 160, vy: 20 }); //computer speed 15-20
  const paddleLRef = useRef({x: 30, y: 320, w: 11.2, h: 160, vy: 40 });

  const createBoard = (context, ball, rightPaddle, leftPaddle) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    //ball
    context.beginPath(); //general routine for howd you fill any shape
    context.fillStyle = 'white';
    context.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI, true);
    context.fill(); //general routine for howd you fill any shape

    //paddle 1
    context.beginPath();
    context.fillStyle = 'white';
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
    context.fill();

    //paddle 2
    context.beginPath();
    context.fillStyle = 'white';
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);
    context.fill();
  
  };

  const ballPaddleCollision = (ball, paddle) => {

    const paddleTop = paddle.y;
    const paddleBottom = paddle.y + paddle.h;
    const paddleLeft = paddle.x;
    const paddleRight = paddle.x + paddle.w;

    const ballTop = ball.y - ball.r;
    const ballBottom = ball.y + ball.r;
    const ballLeft = ball.x - ball.r;
    const ballRight = ball.x + ball.r;

    if (ballRight > paddleLeft && ballLeft < paddleRight && ballBottom > paddleTop && ballTop < paddleBottom) {
      return true;
    } else {
      return false;
    }
  }

  const updateBall = function(context, ball, paddleLeft, paddleRight) {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x - ball.r  < 0) {
      ballReset(ball, context);
    }

    if (ball.x + ball.r > context.canvas.width) {
      ballReset(ball, context);
    }

    if (ball.y - ball.r  <= 0) {
      ball.vy *= -1;
    }
    
    if (ball.y + ball.r >= context.canvas.height) {
      ball.vy *= -1;
    }

    //paddle collision
    if (ballPaddleCollision(ball, paddleLeft)) {
      ball.speed += 1;
      console.log(ball.speed)
      let collidePoint = (ball.y - (paddleLeft.y + paddleLeft.h/2));
      collidePoint = collidePoint / (paddleLeft.h/2); //normalizing collide point between -1 and 1
      let angle = collidePoint * (Math.PI / 4);

      if (ball.vx > 0) {
        ball.vx = -ball.speed * Math.cos(angle);
        ball.vy = ball.speed * Math.sin(angle);
      }

      ball.vx = ball.speed * Math.cos(angle);
      ball.vy = ball.speed * Math.sin(angle);

    }
    
    if (ballPaddleCollision(ball, paddleRight)) {
      ball.speed += 1
      console.log(ball.speed)
      let collidePoint = (ball.y - (paddleRight.y + paddleRight.h/2));
      collidePoint = collidePoint / (paddleRight.h/2); //normalizing collide point between -1 and 1
      let angle = collidePoint * (Math.PI / 4);

      if (ball.vx < 0) {
        ball.vx = ball.speed * Math.cos(angle);
        ball.vy = ball.speed * Math.sin(angle);
      }

      ball.vx = -ball.speed * Math.cos(angle);
      ball.vy = ball.speed * Math.sin(angle);
    }
  };

  const updatePaddleR = function(context, paddle) {
    paddle.y += paddle.vy;

    if (paddle.y >= context.canvas.height-160) {
      paddle.vy *= -1;
      // console.log(paddle)
    }

    if (paddle.y <= 0) {
      paddle.vy *= -1;
      // console.log(paddle)
    }
  };

  const ballReset = (ball, context) => {
    const direction = [1, -1];
    ball.x = context.canvas.width/2;
    ball.y = context.canvas.height/2;
    ball.vx = 5 * direction[Math.floor(Math.random() * direction.length)];
    ball.vy = 0;
    ball.speed = 5;
  }

  const movePaddle = (paddleLeft, paddleRight, key) => {
    const paddleTop = paddleLeft.y;
    const paddleBottom = paddleLeft.y + paddleLeft.h;

    if (key === "s" && paddleBottom < 800) {
      paddleLeft.y += paddleLeft.vy;
      // console.log(paddleLeft)
    }

    if (key === "w" && paddleTop > 0) {
      paddleLeft.y -= paddleLeft.vy;
      // console.log(paddle)
    }

    if (key === "ArrowDown" && paddleRight.y < 640) {
      paddleRight.y += paddleRight.vy;
      // console.log(paddleLeft)
    }

    if (key === "ArrowUp" && paddleRight.y > 0) {
      paddleRight.y -= paddleRight.vy;
      // console.log(paddle)
    }
  
  }

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); //obtains the rendering context and its drawing functions
    updateBall(context, ballRef.current, paddleLRef.current, paddleRRef.current);
    updatePaddleR(context, paddleRRef.current);
    createBoard(context, ballRef.current, paddleRRef.current, paddleLRef.current);
    requestAnimationFrame(render);
  }

  useEffect(()=> { //need a useEffect to control/trigger side effects for our components. We want to call/use this code after our Canvas component is rendered -> useEffect allows for this

    render();

  }, []) //empty array says we only want to trigger this function once

  return(
    <canvas width="1400" height="800" id="game-board" ref={canvasRef} tabIndex="0" onKeyDown={event => movePaddle(paddleLRef.current,paddleRRef.current, event.key)}>
    </canvas>
  )
};

export default Canvas;