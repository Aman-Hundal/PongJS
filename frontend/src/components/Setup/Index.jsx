import UserFormP1 from './UserFormP1';
import UserFormP2 from './UserFormP2';
import GameModeSelection from './GameModeSelection';
import useVisualMode from '../../hooks/useVisualMode';
import RecentMatches from '../RecentMatches';
import Start from './Start';
import '../styles/Setup.css';
import { useEffect } from 'react';

const Index = (props) => {
  const {matches} = props;
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
      <RecentMatches matches={matches} />
    </div>
  )
}

export default Index;