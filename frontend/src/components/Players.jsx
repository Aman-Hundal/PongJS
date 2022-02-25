const Players = (props) => {
  const {P1, P2} = props;
  
  return (
    <div>
      <h1>{P1} vs. {P2}</h1>
    </div>
  )
};

export default Players;