const Button = (props) => {
    const { message, onClick } = props;
    return (
        <button onClick={onClick}>{message}</button>
    )
}

export default Button;