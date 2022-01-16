import '../styles/Setup.css';
import Button from './Button';

const GameModeSelection = (props) => {
    const { transition} = props;
    return (
        <div className="gamemode-card">
            <h2>Select a Game Mode: </h2>
            <ul id="gamemode-list">
                <li onClick={() => transition("CONFIRMP1")}>Online</li>
                <br></br>
                <li>Offline (WIP)</li>
            </ul>
        </div>
    )
}

export default GameModeSelection;