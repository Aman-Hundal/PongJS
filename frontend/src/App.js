import './App.css';
import Canvas from "./components/Canvas";
import Index from './components/Setup/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAppData from './hooks/useAppData';

function App() {

  const {
    state,
    loading,
    saveMatch,
    setPlayerName,
    increasePlayerScore,
    animateTimer,
    newGame,
    gameOnEnd,
    winner,
    updateBall,
    resetGame
  } = useAppData();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index setPlayerName={setPlayerName} matches={state.matches} loading={loading} />} />
          <Route path="/play" element={<Canvas
            updateBall={updateBall}
            resetGame={resetGame}
            winner={winner}
            newGame={newGame}
            gameOnEnd={gameOnEnd}
            gameOn={state.gameOn}
            P1={state.players[0]}
            P2={state.players[1]}
            increasePlayerScore={increasePlayerScore}
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