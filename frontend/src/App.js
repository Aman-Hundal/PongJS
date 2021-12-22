import './App.css';
import Canvas from "./components/Canvas"
import Leaderboard from './components/Leaderboard';
import {useState, useEffect} from 'react';

function App() {
const [state, setState] = useState({
  users: []
});

//testdata
const testData = [{name: "Amo", score: 50}, {name:"Elliot", score: 100}]

  return (
    <div className="App">
      <h1>Pong!</h1>
      <Canvas />
      <h1>Leaders</h1>
      <Leaderboard users={testData} />
    </div>
  );
}

export default App;
