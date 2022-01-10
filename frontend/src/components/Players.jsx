const Players = (props) => {
  const {P1, P2} = props;
  
  return (
    <div>
      <h1>{P1.name} vs. {P2.name}</h1>
    </div>
  )
};

export default Players;