import UserFormP1 from './UserFormP1';
import UserFormP2 from './UserFormP2';
import GameModeSelection from './GameModeSelection';
import Button from './Button';

const Index = (props) => {
  const {setNameP1, setNameP2, cancel, confirm, start} = props;
  return (
    <div>
      <GameModeSelection cancel={cancel} confirm={confirm} />
      <UserFormP1 setPlayerName={setNameP1} cancel={cancel} />
      <UserFormP2 setPlayerName={setNameP2} cancel={cancel} />
      <Button message={"Start"} onClick={start} />
    </div>
  )
}

export default Index;

// flow:
// choose game mode -> player 1 form -> player 2 form -> start game (triggers gameOn state to true) -> router to canvas
// can confirm or cancel. Cancel goes backwd, confirm goes fwd. once start game selected trigger state and go to canvas using routes.
// index is managed via history stack like shceduler.
// react router is used to transfer from index -> canvas 