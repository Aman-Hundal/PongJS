const Timer = (props) => {
  const { mins, secs } = props;
  
  return (
    <h1>{mins}:{secs < 10 ? "0" : ""}{secs}</h1>
  )
};

export default Timer;