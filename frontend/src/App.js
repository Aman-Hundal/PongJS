import './App.css';
import Canvas from "./components/Canvas";
import RecentMatches from './components/RecentMatches';
import Index from './components/Setup/Index';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
const [state, setState] = useState({
  matches: [{}],
  player1: {name: "Player1", score: 0},
  player2: {name: "Player2", score: 0},
  minutes: 1,
  seconds: 0,
  gameOn: true
});

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
  const player1 =  {...state.player1, score: state.player1.score = 0};
  const player2 = {...state.player2, score: state.player2.score = 0};
  setState({...state, player1, player2, minutes: 1, seconds: 0, gameOn: true});
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

//testdata
const testData = [
  {id: 1, p1: "Amo", p2: "Elliot", score:[5,3], winner: "Amo"},
  {id: 2, p1: "Paul", p2: "Peter", score:[0,5], winner: "Peter"},
  {id: 3, p1: "Aragorn", p2: "Gandalf", score:[5,4], winner: "Aragorn"},
  {id: 4, p1: "Tobey", p2: "Andrew", score:[3,5], winner: "Andrew"},
  {id: 5, p1: "Amo", p2: "Viggo", score:[5,5], winner: "Draw"}
];

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
          animateTimer={animateTimer} />} />
        </Routes>
        <RecentMatches matches={testData} />
      </div>
    </BrowserRouter>
  )
}

export default App;

// to do:
//singe player functionalty:
// refactor functions and state and repettive code and userefs/usestates
//timer only starts on enter (game on only true on start ? )
// false game on = no animater or timer, -> enter to trigger game on to true(and therefor eanimation and timer) -> gameover = game on False -> playagain -> game on True / start - game on True

//multiplayer functionality:
// websockets at multiplayer functionality
// leaderboard = recent game scores of last 5 games MONGO DB + backend work