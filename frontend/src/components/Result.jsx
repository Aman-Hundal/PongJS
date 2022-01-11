const Result = function(props) {
  const { winner, P1, P2, mins, secs } = props;
  let result = winner(P1, P2, mins, secs); 
  return (
    result ? 
    <div className="popup">
      <div className="inner-popup">
        <h1>{result}</h1>
        <button>Close</button>
      </div>
    </div> : ""
  )
 }

 export default Result;