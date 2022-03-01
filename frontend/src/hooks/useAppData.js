import {useState, useEffect} from 'react';
import axios from 'axios';
import { ballPaddleCollision, ballReset } from '../helpers/canvasHelpers';

const useAppData = function(initial) {
  const [state, setState] = useState({
    matches: [{}],
    player1: {name: localStorage.getItem("player1"), score: 0},
    player2: {name: localStorage.getItem("player2"), score: 0},
    minutes: 1,
    seconds: 30,
    gameOn: true
  });
  
  const baseURL = "http://localhost:3001";
  
  useEffect(() => {
    const matchesPromise = axios.get(baseURL+"/matches");
    const promises = [matchesPromise];
  
    Promise.all(promises)
    .then((allData) => {
      // console.log(allData[0].data);
      setState(prev => ({...prev, matches: allData[0].data}));
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

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
      ball.speed += 0.25;
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
      ball.speed += 0.25;
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
  
  const saveMatch = () => {
    axios.post(baseURL+"/matches", {
      player1: state.player1,
      player2: state.player2
    })
    .then(response => {
      // console.log("RESPONSE", response.data);
      const newMatches = response.data;
      const player1 =  {...state.player1, score: state.player1.score = 0};
      const player2 = {...state.player2, score: state.player2.score = 0};
      setState(prev => ({...prev, matches: newMatches, player1, player2, minutes: 1, seconds: 30, gameOn: true}));
    })
    .catch(error => console.error(error));
  }
  
  const setNameP1 = (name) => {
    const player1 = {...state.player1, name: name};
    setState({...state, player1});
  }
  
  const setNameP2 = (name) => {
    const player2 = {...state.player2, name: name};
    setState({...state, player2});
  }
  
  const increaseScoreP1 = () => {
    // console.log("P1 score increased");
    const player1 = {...state.player1, score: state.player1.score += 1};
    setState({...state, player1});
  }
  
  const increaseScoreP2 = () => {
    // console.log("P2 score increased");
    const player2 = {...state.player2, score: state.player2.score += 1};
    setState({...state, player2});
  }
  
  const animateTimer = (timerRef) => {
    let timerId = setInterval( () => {
      if ((state.seconds === 0 && state.minutes === 0) || state.player1.score === 5 || state.player2.score === 5) {
        clearInterval(timerId);
      } else if (state.seconds === 0) {
        setState({...state, seconds: state.seconds = 59});
        setState({...state, minutes: state.minutes -= 1});
        timerRef.secs = 59;
        timerRef.mins -= 1;
      } else {
        setState({...state, seconds: state.seconds -= 1});
        timerRef.secs -= 1;
      }
    }, 1000)
  }

  // const startGame = () => {
  //   setState(prev => ({...prev, player1, player2, minutes: 1, seconds: 0, gameOn: true}));
  // }
  
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
    // paddleRight.vy = 0;
    paddleLeft.y = 280;
  }
  
  const gameOnEnd = () => {
    setState({...state, gameOn: false});
  }
  
  const gameOnStart = () => {
    setState({...state, gameOn: true});
  }
  
  const winner = function(player1, player2, minutes, seconds) {
    if (player1.score === 5) {
      return `${player1.name} is the winner!`;
    } else if (player2.score === 5) {
      return `${player2.name} is the winner!`;
    } else if (player2.score  === 5 && player1.score === 5) {
      return "Draw!";
    }
  
    if (minutes === 0 && seconds === 0) {
      if (player1.score > player2.score) {
        return `${player1.name} is the winner!`;
      } else if (player2.score > player1.score) {
        return `${player2.name} is the winner!`;
      } else if (player1.score === player2.score) {
        return "Draw!";
      }
    }
  
    return null;
  }

  const resetGame = (ballRef, paddleLeftRef, paddleRightRef, scoreRef, timerRef) => {
    saveMatch();
    newGame(ballRef, paddleLeftRef, paddleRightRef, scoreRef, timerRef);
    // console.log("NEW SCORE", scoreRef, timerRef)
  }

  return {
    state,
    saveMatch,
    setNameP1,
    setNameP2,
    increaseScoreP1,
    increaseScoreP2,
    animateTimer,
    newGame,
    gameOnEnd,
    gameOnStart,
    winner,
    updateBall,
    resetGame
  }

}

export default useAppData;