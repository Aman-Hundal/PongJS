import {useEffect} from 'react';

const Timer = (props) => {
  const {mins, secs, animateTimer} = props;
  
  useEffect(() => { //need a useEffect to control/trigger side effects for our components. We want to call/use this code after our Canvas component is rendered -> useEffect allows for this
    animateTimer();

  }, [])
  
  return (
    <h1>{mins}:{secs}</h1>
  )
};

export default Timer;