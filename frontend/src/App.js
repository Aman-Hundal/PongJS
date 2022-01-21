import './App.css';
import Canvas from "./components/Canvas";
import Index from './components/Setup/Index';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
const [state, setState] = useState({
  matches: [{}],
  player1: {name: "Player1", score: 0},
  player2: {name: "Player2", score: 0},
  minutes: 1,
  seconds: 0,
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
    setState(prev => ({...prev, matches: newMatches, player1, player2, minutes: 1, seconds: 0, gameOn: true}));
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
  console.log("P1 score increased");
  const player1 = {...state.player1, score: state.player1.score += 1};
  setState({...state, player1});
}

const increaseScoreP2 = () => {
  console.log("P2 score increased");
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

const newGame = (ball, paddleLeft, paddleRight, scoreRef, timerRef) => {
  scoreRef.scoreP1 = 0; 
  timerRef.mins = 1;
  timerRef.secs = 0;
  scoreRef.scoreP2 = 0;
  ball.x = 700;
  ball.y = 400;
  ball.vx = 0;
  ball.vy = 0;
  ball.speed = 5;
  paddleRight.y = 320;
  // paddleRight.vy = 0;
  paddleLeft.y = 320;
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

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index setNameP1={setNameP1} setNameP2={setNameP2} start={gameOnStart}/>} />
          <Route path="/play" element={<Canvas 
          winner={winner} 
          newGame={newGame} 
          gameOnEnd={gameOnEnd} 
          gameOn={state.gameOn} 
          P1={state.player1} 
          P2={state.player2} 
          increaseScoreP1={increaseScoreP1} 
          increaseScoreP2={increaseScoreP2} 
          mins={state.minutes} 
          secs={state.seconds} 
          animateTimer={animateTimer}
          matches={state.matches}
          saveMatch={saveMatch} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;