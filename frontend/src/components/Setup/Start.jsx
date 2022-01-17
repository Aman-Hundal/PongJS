import '../styles/Setup.css';
import { Link } from 'react-router-dom';

const Start = (props) => {
    const { back } = props;
    return (
        <div className="start-card">
        <h2>Ready?</h2>
            <div>
            <Link className="start-card-link" to='/play'><p>Start Game</p></Link>
            <p className="start-card-content" onClick={() => back()} >Back</p>
            </div>
        </div>
    )
}

export default Start;