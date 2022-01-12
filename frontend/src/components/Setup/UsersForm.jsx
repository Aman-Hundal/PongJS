import {useState} from 'react';

const UserForm = (props) => {
    const {setNameP1, setNameP2} = props;
    const [name, setName] = useState("");

    return (
        <main className="playerform">
            <h1>Player Name:</h1>
            <form onSubmit={event => setNameP1(event)} autoComplete="off">
                <input
                onChange={event => setName(event.target.value)} 
                name="Player Name:"
                placeholder="Please Enter Player Name"
                type="text"
                value={name}            
                />
            </form>
            <button>Submit</button>
        </main>
    )
}

export default UserForm;