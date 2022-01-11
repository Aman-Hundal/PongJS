const PlayAgain = (props) => {
    const { trigger } = props;
    return (
        trigger ? <button>Play Again?</button> : <h1>Press Enter to Start</h1>
    )
}

export default PlayAgain;