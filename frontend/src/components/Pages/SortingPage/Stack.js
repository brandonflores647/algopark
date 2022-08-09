const Stack = ({ height, color }) => {
    const styleObj = {
        width: `10px`,
        height: `${height}%`,
        backgroundColor: `${color}`
    }
    console.log(height)
    return (
        <div style={styleObj}></div>
    );
}

export default Stack;
