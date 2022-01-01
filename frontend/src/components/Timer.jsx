const Timer = (props) => {
  const {mins, secs} = props;
  let humanSeconds = 0;

  if (secs === 60) {
    humanSeconds = "00";
  }
  
  return (
    <h1>{mins}:{humanSeconds}</h1>
  )
};

export default Timer;