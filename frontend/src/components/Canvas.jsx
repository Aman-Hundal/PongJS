import { useRef, useEffect } from 'react'; 
//useRef allows us to get a dom element in React. Refs provide a way to access DOM nodes or React elements created in the render method
//refs are great for accesing/reference dom elements (likes HTML CANVAS) and for persisting/updating values across renders without causing a re render. But generally USE STATE TO MANAGE VALUEs/DATA
import './styles/Canvas.css';
import Score from "./Score";
import Timer from "./Timer";
import PlayAgain from './PlayAgain';
import Result from './Result';
import Players from './Players';
import {  createBoard, gameOver, userInput } from '../helpers/canvasHelpers';

const Canvas = function(props) {
  const {P1, P2, updateBall, mins, secs, animateTimer, gameOn, gameOnEnd, winner, resetGame} = props;
  const canvasRef = useRef(null);
  const ballRef = useRef({x: 640, y: 360, r: 10, vx: 0, vy: 0, speed: 5}); //speed 10 best, 14 max, 7 slow, 20 super
  const paddleRRef = useRef({x: 1235, y: 280, w: 11.2, h: 160, vy: 40}); //computer speed 15-20
  const paddleLRef = useRef({x: 30, y: 280, w: 11.2, h: 160, vy: 40});
  const scoreRef = useRef({scoreP1: P1.score, scoreP2: P2.score});
  const timerRef = useRef({mins: mins, secs: secs});
  let gameOnRef = useRef(gameOn);

  console.log(ballRef.current.speed)
  // const fps = 30;
  // console.log("ref", gameOnRef.current);
  // console.log("state", gameOn);
  const render = () => {
    const canvas = canvasRef.current;
    
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d'); //obtains the rendering context and its drawing functions
    updateBall(context, ballRef.current, paddleLRef.current, paddleRRef.current, scoreRef.current);
    // updatePaddleR(context, paddleRRef.current); //old computer paddle code
    createBoard(context, ballRef.current, paddleRRef.current, paddleLRef.current);
    
    if (gameOver(scoreRef.current, timerRef.current)) {
      gameOnRef.current = false;
      gameOnEnd();
    }
    if (gameOnRef.current) {
      requestAnimationFrame(render);
    }
  }

  useEffect(() => { //need a useEffect to control/trigger side effects for our components. We want to call/use this code after our Canvas component is rendered -> useEffect allows for this
    
    animateTimer(timerRef.current);
    render();

  }, [gameOn]) //empty array says we only want to trigger this function once

  return(
    <div>
    <Players P1={localStorage.getItem("player1")} P2={localStorage.getItem("player2")} />
    <Timer mins={mins} secs={secs} animateTimer={animateTimer} />
    <Score scoreP1={P1.score} scoreP2={P2.score} />
    <canvas width="1280" height="720" id="game-board" ref={canvasRef} tabIndex="0" onKeyDown={event => userInput(paddleLRef.current,paddleRRef.current, ballRef.current, event.key)} >
    </canvas>
    <Result winner={winner} P1={P1} P2={P2} mins={mins} secs={secs} />
    <PlayAgain trigger={P1.score === 5 || P2.score === 5 || (mins === 0 && secs === 0) ? true : null}  resetGame={() => {
      resetGame(ballRef.current, paddleLRef.current, paddleRRef.current, scoreRef.current, timerRef.current)
      gameOnRef.current = true;}} />
    </div>
  )
};

export default Canvas;