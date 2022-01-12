import UserFormP1 from './UserFormP1';
import UserFormP2 from './UserFormP2';
import GameSelection from './GameSelection';

const Index = (props) => {
  const {setNameP1, setNameP2} = props;
  return (
    <div>
      <GameSelection />
      <UserFormP1 setPlayerName={setNameP1} />
      <UserFormP2 setPlayerName={setNameP2} />
    </div>
  )
}

export default Index;