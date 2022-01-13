import {useState} from 'react';

const UserFormP2 = (props) => {
    const { setPlayerName, transition, back } = props;
    const [name, setName] = useState("");

    return (
        <main className="playerform">
            <h2>Please Enter Player Two Name:</h2>
            <form onSubmit={event => setName(event)} autoComplete="off">
                <input
                onChange={event => setName(event.target.value)} 
                name="Player Name:"
                placeholder="Please Enter Player Name"
                type="text"
                value={name}            
                />
            </form>
            <button onClick={() => {
                setPlayerName(name)
                transition("START")}
                }>Confirm</button>
            <button onClick={() => back()} >Cancel</button>
        </main>
    )
}

export default UserFormP2;