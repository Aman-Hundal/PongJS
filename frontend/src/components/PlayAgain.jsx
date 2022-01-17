import { Link } from 'react-router-dom';
import './styles/PlayAgain.css';

const PlayAgain = (props) => {
    const { trigger, resetGame } = props;
    return (
        trigger ?
        <div className="playagain-card">
            <p className="playagain-content" onClick={() => {resetGame()}}>Play Again?</p>
            <Link onClick={() => {resetGame()}} className="playagain-content" to="/"><p>Exit Game</p></Link>
        </div> : <h2>Press Enter to Start</h2>
    )
}

export default PlayAgain;