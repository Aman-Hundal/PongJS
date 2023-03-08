import { useState, useEffect } from 'react';
import axios from 'axios';
import { ballPaddleCollision, ballReset } from '../helpers/canvasHelpers';

const useAppData = function () {
  //Global State
  const [state, setState] = useState({
    matches: [{}],
    players: [{ name: localStorage.getItem("player1"), score: 0 }, { name: localStorage.getItem("player2"), score: 0 }],
    minutes: 1,
    seconds: 30,
    gameOn: true
  });
  const [loading, setLoading] = useState(true);
  const baseURL = "http://api-pongjs.eba-gv2f7jvs.ca-central-1.elasticbeanstalk.com";

  //Functions
  //Function to gather and load game data
  const fetchMatchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/matches`);
      setState(prev => ({ ...prev, matches: response.data }));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  //Function to manage and control where the ball moves on the canvas during the game
  const updateBall = function (context, ball, paddleLeft, paddleRight, scoreRef) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    //If ball passes the left side of the game board, reset the ball and paddles, and add a point for second player
    if (ball.x - ball.r < 0 && scoreRef.scoreP2 < 5) {
      //ballReset function sets the ball to the center of the canvas, paddles to their starting points, and resets ball speed to normal. Then randomly shoots ball left or right to start the new round
      ballReset(ball, context, paddleRight, paddleLeft);
      scoreRef.scoreP2 += 1;
      increasePlayerScore(1);
    }
    //If ball passes the right side of the game board, reset the ball and paddles, and add a point for first player
    if (ball.x + ball.r > context.canvas.width && scoreRef.scoreP1 < 5) {
      //ballReset function sets the ball to the center of the canvas, paddles to their starting points, and resets ball speed to normal. Then randomly shoots ball left or right to start the new round
      ballReset(ball, context, paddleRight, paddleLeft);
      scoreRef.scoreP1 += 1;
      increasePlayerScore(0);
    }
    //Ball collision logic if ball touches the top of the canvas
    if (ball.y - ball.r <= 0) {
      ball.vy *= -1;
    }
    //Ball collision logic if ball touches the bottom of the canvas
    if (ball.y + ball.r >= context.canvas.height) {
      ball.vy *= -1;
    }
    //Paddle collision logic for left paddle
    //ballPaddleCollision returns true or false depending on if ball collides with passed in paddle arg
    if (ballPaddleCollision(ball, paddleLeft)) {
      ball.speed += 0.25;
      // Determine collison result (angle and direction)
      let collidePoint = (ball.y - (paddleLeft.y + paddleLeft.h / 2));
      collidePoint = collidePoint / (paddleLeft.h / 2);
      let angle = collidePoint * (Math.PI / 4);
      if (ball.vx > 0) {
        ball.vx = -ball.speed * Math.cos(angle);
        ball.vy = ball.speed * Math.sin(angle);
      }
      ball.vx = ball.speed * Math.cos(angle);
      ball.vy = ball.speed * Math.sin(angle);
    }
    //Paddle collision logic for right paddle
    //ballPaddleCollision returns true or false depending on if ball collides with passed in paddle arg
    if (ballPaddleCollision(ball, paddleRight)) {
      ball.speed += 0.25;
      // Determine collison result (angle and direction)
      let collidePoint = (ball.y - (paddleRight.y + paddleRight.h / 2));
      collidePoint = collidePoint / (paddleRight.h / 2);
      let angle = collidePoint * (Math.PI / 4);
      if (ball.vx < 0) {
        ball.vx = ball.speed * Math.cos(angle);
        ball.vy = ball.speed * Math.sin(angle);
      }
      ball.vx = -ball.speed * Math.cos(angle);
      ball.vy = ball.speed * Math.sin(angle);
    }
  };
  //Function to send axios request to back end API to save match result data
  const saveMatch = async () => {
    const data = {
      player1: state.players[0],
      player2: state.players[1]
    };
    try {
      const response = await axios.post(`${baseURL}/matches`, data);
      const newMatches = response.data;
      const players = state.players.map(player => ({ ...player, score: 0 }));
      setState(prev => ({ ...prev, matches: newMatches, players, minutes: 1, seconds: 30, gameOn: true }));
    } catch (error) {
      console.error(error);
    }
  };
  //Function to set player names
  const setPlayerName = (playerIndex, name) => {
    const players = [...state.players];
    players[playerIndex].name = name;
    setState({ ...state, players });
  }
  //Function to increase the score of a player
  const increasePlayerScore = (playerIndex) => {
    const players = [...state.players];
    players[playerIndex].score += 1;
    setState({ ...state, players });
  }
  //Function to manage the games timer
  const animateTimer = (timerRef) => {
    let timerId = setInterval(() => {
      if ((state.seconds === 0 && state.minutes === 0) || state.players[0].score === 5 || state.players[1].score === 5) {
        clearInterval(timerId);
      } else if (state.seconds === 0) {
        setState({ ...state, seconds: state.seconds = 59 });
        setState({ ...state, minutes: state.minutes -= 1 });
        timerRef.secs = 59;
        timerRef.mins -= 1;
      } else {
        setState({ ...state, seconds: state.seconds -= 1 });
        timerRef.secs -= 1;
      }
    }, 1000)
  };
  //Function to create a new game 
  const newGame = (ball, paddleLeft, paddleRight, scoreRef, timerRef) => {
    scoreRef.scoreP1 = 0;
    timerRef.mins = 1;
    timerRef.secs = 0;
    scoreRef.scoreP2 = 0;
    ball.x = 640;
    ball.y = 360;
    ball.vx = 0;
    ball.vy = 0;
    ball.speed = 5;
    paddleRight.y = 280;
    paddleLeft.y = 280;
  };
  //Function to change gameOn State (ie. used to turn gameOff/gameOver)
  const gameOnEnd = () => {
    setState({ ...state, gameOn: false });
  }
  //Function to determine the winner of the game (when 5 points is reached or when time runs out)
  const winner = function (player1, player2, minutes, seconds) {
    if (player1.score >= 5) {
      return `${player1.name} is the winner!`;
    }
    if (player2.score >= 5) {
      return `${player2.name} is the winner!`;
    }
    if (minutes === 0 && seconds === 0) {
      if (player1.score > player2.score) {
        return `${player1.name} is the winner!`;
      }
      if (player2.score > player1.score) {
        return `${player2.name} is the winner!`;
      }
      return "Draw!";
    }
    return "";
  };
  //Function to reset the entire game
  const resetGame = (ballRef, paddleLeftRef, paddleRightRef, scoreRef, timerRef) => {
    saveMatch();
    newGame(ballRef, paddleLeftRef, paddleRightRef, scoreRef, timerRef);
  };

  //useEffect to load app data (backend api calls etc.)
  useEffect(() => {
    fetchMatchData();
  }, []);

  return {
    state,
    loading,
    saveMatch,
    increasePlayerScore,
    setPlayerName,
    animateTimer,
    newGame,
    gameOnEnd,
    winner,
    updateBall,
    resetGame
  };
}

export default useAppData;