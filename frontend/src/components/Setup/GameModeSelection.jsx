import '../styles/Setup.css';
import Button from './Button';

const GameModeSelection = (props) => {
    const { transition} = props;
    return (
        <div className="gamemode-card">
            <h2>Select a Game Mode </h2>
            <ul id="gamemode-list">
                <li className="list-item">Online(WIP)</li>
                <br></br>
                <li onClick={() => transition("CONFIRMP1")} className="list-item">Offline</li>
            </ul>
        </div>
    )
}

export default GameModeSelection;