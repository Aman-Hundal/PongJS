import './App.css';
import Canvas from "./components/Canvas"
import Leaderboard from './components/Leaderboard';
import {useState, useEffect} from 'react';


function App() {
const [state, setState] = useState({
  users: [],
  scoreP1: 0,
  scoreP2: 0,
  minutes: 3,
  seconds: 0
});

const increaseScoreP1 = () => {
  console.log("P1 score increased");
  setState({...state, scoreP1: state.scoreP1 += 1});
}

const increaseScoreP2 = () => {
  console.log("P2 score increased");
  setState({...state, scoreP2: state.scoreP2 += 1});
}

const animateTimer = () => {
  setInterval( () => {
    if (state.seconds === 0) {
      setState({...state, seconds: state.seconds = 60});
      setState({...state, minutes: state.minutes -= 1});
    }

    if (state.seconds <= 0 && state.minutes <= 0) {
      clearInterval(animateTimer)
    }

    setState({...state, seconds: state.seconds -= 1});
  }, 1000)
}

//testdata
const testData = [{name: "Amo", score: 50}, {name:"Elliot", score: 100}]

  return (
    <div className="App">
      <h1>Pong!</h1>
      <Canvas scoreP1={state.scoreP1} scoreP2={state.scoreP2} increaseScoreP1={increaseScoreP1} increaseScoreP2={increaseScoreP2} mins={state.minutes} secs={state.seconds} animateTimer={animateTimer} />
      <Leaderboard users={testData} />
    </div>
  );
}

export default App;
