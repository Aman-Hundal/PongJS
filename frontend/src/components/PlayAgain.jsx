import { Link } from 'react-router-dom';

const PlayAgain = (props) => {
    const { trigger, resetGame } = props;
    return (
        trigger ?
        <div>
            <button onClick={() => {resetGame()}}>Play Again?</button>
            <Link to="/"><button onClick={() => {resetGame()}}>Exit Game</button> </Link>
        </div> : <h2>Press Enter to Start</h2>
    )
}

export default PlayAgain;