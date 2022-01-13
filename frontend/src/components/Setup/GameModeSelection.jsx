import '../styles/GameModeSelection.css';
import Button from './Button';

const GameModeSelection = (props) => {
    const { transition} = props;
    return (
        <div className="gamemode-card">
            <h2>Select a Game Mode: </h2>
            <ul id="gamemode-list">
                <li><Button message={"Online"} onClick={() => transition("CONFIRMP1")}/></li>
                <li>Offline (WIP)</li>
            </ul>
        </div>
    )
}

export default GameModeSelection;