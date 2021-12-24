import './App.css';
import Canvas from "./components/Canvas"
import Leaderboard from './components/Leaderboard';
import {useState, useEffect} from 'react';
import Score from './components/Score';

function App() {
const [state, setState] = useState({
  users: [],
  scoreP1: 0,
  scoreP2: 0
});

const increaseScoreP1 = () => {
  setState(prev => ({...prev, scoreP1: state.scoreP1++}))
}

const increaseScoreP2 = () => {
  setState(prev => ({...prev, scoreP2: state.scoreP2++}))
}

//testdata
const testData = [{name: "Amo", score: 50}, {name:"Elliot", score: 100}]

  return (
    <div className="App">
      <h1>Pong!</h1>
      <Score scoreP1={state.scoreP1} scoreP2={state.scoreP2} />
      <Canvas />
      <Leaderboard users={testData} />
    </div>
  );
}

export default App;
