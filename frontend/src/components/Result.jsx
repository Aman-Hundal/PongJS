import './styles/Result.css';

const Result = function(props) {
  const { winner, P1, P2, mins, secs } = props;
  let result = winner(P1, P2, mins, secs); 
  return (
    result ? 
    <div >
      <h1>Result: {result}</h1>
    </div> : ""
  )
 }

 export default Result;