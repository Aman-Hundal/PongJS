import { useRef, useEffect } from 'react'; //useRef allows us to get a dom element in React. Refs provide a way to access DOM nodes or React elements created in the render method
import './styles/Canvas.css';
import Score from "./Score";
import Timer from "./Timer";
import Button from './Button';

const Canvas = function(props) {
  const {scoreP1, scoreP2, increaseScoreP1, increaseScoreP2, mins, secs, animateTimer, newGame} = props;
  // console.log(scoreP1)
  // console.log(scoreP2)
  // const fps = 30;
  const canvasRef = useRef(null);
  const ballRef = useRef({x: 700, y: 400, r: 10, vx: 0, vy: 0, speed: 5}); //speed 10 best, 14 max, 7 slow, 20 super
  const paddleRRef = useRef({x: 1355, y: 320, w: 11.2, h: 160, vy: 0 }); //computer speed 15-20
  const paddleLRef = useRef({x: 30, y: 320, w: 11.2, h: 160, vy: 40 });
  const scoreRef = useRef({scoreP1: scoreP1, scoreP2: scoreP2});
  const timerRef = useRef({mins: mins, secs: secs});
  let gameOnRef = useRef(true);

  console.log("ref", gameOnRef.current)

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

  const gameOver = (scoreRef, timerRef) => {
    if (scoreRef.scoreP1 === 5 || scoreRef.scoreP2 === 5) {
      return true;
    }

    if (timerRef.secs === 0 && timerRef.mins === 0) {
      return true;
    }
  }

  const updateBall = function(context, ball, paddleLeft, paddleRight, scoreRef) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    

    if (ball.x - ball.r  < 0 && scoreRef.scoreP2 < 5) {
      ballReset(ball, context, paddleRight, paddleLeft);
      scoreRef.scoreP2 += 1;
      increaseScoreP2();
    }

    if (ball.x + ball.r > context.canvas.width && scoreRef.scoreP1 < 5) {
      ballReset(ball, context, paddleRight, paddleLeft);
      scoreRef.scoreP1 += 1;
      increaseScoreP1();
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
      // console.log(ball.speed)
      let collidePoint = (ball.y - (paddleLeft.y + paddleLeft.h/2));
      collidePoint = collidePoint / (paddleLeft.h/2); //normalizing collide point between -1 and 1
      let angle = collidePoint * (Math.PI / 4);

      if (ball.vx > 0) {
        ball.vx = -ball.speed * Math.cos(angle);
        ball.vy = ball.speed * Math.sin(angle);
        // console.log(ball)
      }

      ball.vx = ball.speed * Math.cos(angle);
      ball.vy = ball.speed * Math.sin(angle);
      // console.log(ball)

    }
    
    if (ballPaddleCollision(ball, paddleRight)) {
      ball.speed += 1
      // console.log(ball.speed)
      let collidePoint = (ball.y - (paddleRight.y + paddleRight.h/2));
      collidePoint = collidePoint / (paddleRight.h/2); //normalizing collide point between -1 and 1
      let angle = collidePoint * (Math.PI / 4);

      if (ball.vx < 0) {
        ball.vx = ball.speed * Math.cos(angle);
        ball.vy = ball.speed * Math.sin(angle);
        // console.log(ball)
      }

      ball.vx = -ball.speed * Math.cos(angle);
      ball.vy = ball.speed * Math.sin(angle);
      // console.log(ball)
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

  const ballReset = (ball, context, paddleRight, paddleLeft) => {
    const direction = [1, -1];
    ball.x = context.canvas.width/2;
    ball.y = context.canvas.height/2;
    ball.vx = 5 * direction[Math.floor(Math.random() * direction.length)];
    ball.vy = 0;
    ball.speed = 5;
    paddleRight.y = 320;
    paddleLeft.y = 320;
    paddleRight.vy = 20;
  }

  const startGame = (ball, paddle) => {
    const direction = [1, -1];
    ball.vx = 5 * direction[Math.floor(Math.random() * direction.length)];
    ball.vy = 0;
    ball.speed = 5;
    paddle.vy = 20;
  }


  const userInput = (paddleLeft, paddleRight, ball, key) => {
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

    if(key === "Enter" && ball.vx === 0 && paddleRight.vy === 0) {
      startGame(ball, paddleRight);
    }
  
  }

  const render = () => {
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); //obtains the rendering context and its drawing functions
    updateBall(context, ballRef.current, paddleLRef.current, paddleRRef.current, scoreRef.current);
    updatePaddleR(context, paddleRRef.current);
    createBoard(context, ballRef.current, paddleRRef.current, paddleLRef.current);
    
    if (gameOver(scoreRef.current, timerRef.current)) {
      gameOnRef.current = false;
    }

    if (gameOnRef.current) {
      requestAnimationFrame(render);
    }
    
  }

  useEffect(() => { //need a useEffect to control/trigger side effects for our components. We want to call/use this code after our Canvas component is rendered -> useEffect allows for this
    
    animateTimer(timerRef.current);
    render();

  }, []) //empty array says we only want to trigger this function once

  return(
    <div>
    <Timer mins={mins} secs={secs} animateTimer={animateTimer} />
    <Score scoreP1={scoreP1} scoreP2={scoreP2} />
    <canvas width="1400" height="800" id="game-board" ref={canvasRef} tabIndex="0" onKeyDown={event => userInput(paddleLRef.current,paddleRRef.current, ballRef.current, event.key)} >
    </canvas>
      <div onClick={(event) => {
        newGame(ballRef.current, paddleLRef.current, paddleRRef.current, scoreRef.current, timerRef.current);
        gameOnRef.current = true;
        console.log(scoreRef.current, timerRef.current)
      }}>
        <Button message={scoreP1 === 5 || scoreP2 === 5 || (mins === 0 && secs === 0) ? "Play Again?" : "Press Enter to Start"} /> 
      </div>
    </div>
  )
};

export default Canvas;