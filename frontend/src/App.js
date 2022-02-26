import './App.css';
import Canvas from "./components/Canvas";
import Index from './components/Setup/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAppData from './hooks/useAppData';

function App() {

  const {
    state,
    saveMatch,
    setNameP1,
    setNameP2,
    increaseScoreP1,
    increaseScoreP2,
    animateTimer,
    newGame,
    gameOnEnd,
    winner,
    updateBall,
    resetGame,
    startGame
  } = useAppData();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index setNameP1={setNameP1} setNameP2={setNameP2} start={startGame} matches={state.matches}/>} />
          <Route path="/play" element={<Canvas 
          updateBall={updateBall}
          resetGame={resetGame}
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
          saveMatch={saveMatch} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;

//TO DO:
// when game starts (start game -> timer and score are reset) / when back is selected -> score and timer must be reset LIKE REFRESH DOES. 
// Refresh breaks recent matches (have to hit refresh again for it to load)
// timer only starts on press enter
// styling of p1, and p2 forms + recent matches
