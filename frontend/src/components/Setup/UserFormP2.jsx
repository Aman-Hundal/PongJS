import {useState} from 'react';
import '../styles/Setup.css';

const UserFormP2 = (props) => {
    const { setPlayerName, transition, back } = props;
    const [name, setName] = useState("");

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            setPlayerName(1, name);
            localStorage.setItem("player2", name);
            transition("START");
        }
    }

    return (
        <main className="playerform">
            <div className="form-main">
            <h3>Please Enter Player Two Name:</h3>
            <form onSubmit={event => setName(event)} autoComplete="off">
                <input
                onChange={event => setName(event.target.value)}
                onKeyDown={event => handleKeyPress(event)}  
                name="Player Name:"
                placeholder=""
                type="text"
                value={name}            
                />
            </form>
            </div>
            <div className="form-button">
            <p className="form-button-content" onClick={() => {
                setPlayerName(1, name)
                localStorage.setItem("player2", name)
                transition("START")}
                }>Confirm</p>
            <p className="form-button-content" onClick={() => back()} >Back</p>
            </div>
        </main>
    )
}

export default UserFormP2;