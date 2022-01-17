import {useState} from 'react';
import '../styles/Setup.css';

const UserFormP2 = (props) => {
    const { setPlayerName, transition, back } = props;
    const [name, setName] = useState("");

    return (
        <main className="playerform">
            <div className="form-main">
            <h2>Please Enter Player Two Name:</h2>
            <form onSubmit={event => setName(event)} autoComplete="off">
                <input
                onChange={event => setName(event.target.value)} 
                name="Player Name:"
                placeholder=""
                type="text"
                value={name}            
                />
            </form>
            </div>
            <div className="form-button">
            <p className="form-button-content" onClick={() => {
                setPlayerName(name)
                transition("START")}
                }>Confirm</p>
            <p className="form-button-content" onClick={() => back()} >Back</p>
            </div>
        </main>
    )
}

export default UserFormP2;