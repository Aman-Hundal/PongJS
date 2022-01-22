const Score = (props) => {
  const {scoreP1, scoreP2} = props;
  return (
  <h1>{scoreP1} - {scoreP2}</h1>
  )
};

export default Score;