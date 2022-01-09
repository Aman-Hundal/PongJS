import './App.css';
import Canvas from "./components/Canvas"
import Leaderboard from './components/Leaderboard';
import {useState, useEffect} from 'react';


function App() {
const [state, setState] = useState({
  matches: [{}],
  players: {},
  scoreP1: 0,
  scoreP2: 0,
  minutes: 0,
  seconds: 15,
  gameOn: true
});

const increaseScoreP1 = () => {
  console.log("P1 score increased");
  setState({...state, scoreP1: state.scoreP1 += 1});
}

const increaseScoreP2 = () => {
  console.log("P2 score increased");
  setState({...state, scoreP2: state.scoreP2 += 1});
}

const animateTimer = (timerRef) => {
  let timerId = setInterval( () => {
    if ((state.seconds === 0 && state.minutes === 0) || state.scoreP1 === 5 || state.scoreP2 === 5) {
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

const newGame = (ball, paddleLeft, paddleRight, score, timer) => {
  setState({...state, scoreP1: 0, scoreP2:0, minutes: 0, seconds: 15, gameOn: true});
  score.scoreP1 = 0; 
  timer.mins = 0;
  timer.secs = 10;
  score.scoreP2 = 0;
  ball.x = 700;
  ball.y = 400;
  ball.vx = 0;
  ball.vy = 0;
  ball.speed = 5;
  paddleRight.y = 320;
  paddleRight.vy = 0;
  paddleLeft.y = 320;
}

const endGame = () => {
  setState({...state, gameOn: false});
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
    <div className="App">
      <h1>Pong!</h1>
      <Canvas newGame={newGame} endGame={endGame} gameOn={state.gameOn} scoreP1={state.scoreP1} scoreP2={state.scoreP2} increaseScoreP1={increaseScoreP1} increaseScoreP2={increaseScoreP2} mins={state.minutes} secs={state.seconds} animateTimer={animateTimer} />
      <Leaderboard matches={testData} />
    </div>
  );
}

export default App;

// to do:
//singe player functionalty:
// draw, win, lose functionality
// message stating which player won
// user login



// refactor functions and state and repettive code

//multiplayer functionality:
// websockets at multiplayer functionality
// leaderboard = recent game scores of last 5 games MONGO DB + backend work