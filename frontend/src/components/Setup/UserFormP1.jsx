import {useState} from 'react';
import '../styles/Setup.css';

const UserFormP1 = (props) => {
    const { setPlayerName, back, transition } = props;
    const [name, setName] = useState("");

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            setPlayerName(0, name);
            localStorage.setItem("player1", name);
            transition("CONFIRMP2");
        }
    }

    return (
        <main className="playerform">
            <div className="form-main">
            <h3>Please Enter Player One Name:</h3>
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
                setPlayerName(0, name)
                localStorage.setItem("player1", name)
                transition("CONFIRMP2")}
                }>Confirm</p>
            <p className="form-button-content" onClick={() => back()} >Back</p>
            </div>
        </main>
    )
}

export default UserFormP1;