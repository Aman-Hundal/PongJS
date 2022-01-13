import {useState} from 'react';
import Button from './Button';

const UserFormP1 = (props) => {
    const { setPlayerName, cancel } = props;
    const [name, setName] = useState("");

    return (
        <main className="playerform">
            <h2>Please Enter Player One Name:</h2>
            <form onSubmit={event => setName(event)} autoComplete="off">
                <input
                onChange={event => setName(event.target.value)} 
                name="Player Name:"
                placeholder="Please Enter Player Name"
                type="text"
                value={name}            
                />
            </form>
            <button onClick={event => setPlayerName(name)}>Confirm</button>
            <Button message={"Cancel"} onClick={cancel} />
        </main>
    )
}

export default UserFormP1;