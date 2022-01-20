import UserFormP1 from './UserFormP1';
import UserFormP2 from './UserFormP2';
import GameModeSelection from './GameModeSelection';
import useVisualMode from '../../hooks/useVisualMode';
import Start from './Start';
import '../styles/Setup.css';

const Index = (props) => {
  const {setNameP1, setNameP2} = props;
  const INDEX = "INDEX";
  const CONFIRMP1 = "CONFIRMP1";
  const CONFIRMP2 = "CONFIRMP2";
  const START = "START";
  const { mode, transition, back } = useVisualMode(INDEX);
  
  return (
    <div>
      <h1>Welcome to Pong</h1>
      {mode === "INDEX" && <GameModeSelection transition={transition} />}
      {mode === CONFIRMP1 && <UserFormP1 setPlayerName={setNameP1} back={back} transition={transition} />}
      {mode === CONFIRMP2 && <UserFormP2 setPlayerName={setNameP2}  back={back} transition={transition} />}
      {mode === START && <Start back={back} transition={transition} />}
    </div>
  )
}

export default Index;

// flow:
// choose game mode -> player 1 form -> player 2 form -> start game (triggers gameOn state to true) -> router to canvas x
// can confirm or cancel. Cancel goes backwd, confirm goes fwd. once start game selected trigger state and go to canvas using routes. x
// index is managed via history stack like shceduler. x
// react router is used to transfer from index -> canvas x