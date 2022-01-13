import '../styles/GameModeSelection.css';
import Button from './Button';

const GameModeSelection = (props) => {
    const {confirm, cancel} = props;
    return (
        <div className="gamemode-card">
            <ul id="gamemode-list">
                <li>Online</li>
                <li>Offline</li>
            </ul>
            <Button message={"Confirm"} onClick={confirm} />
            <Button message={"Cancel"} onClick={cancel} />
        </div>
    )
}

export default GameModeSelection;