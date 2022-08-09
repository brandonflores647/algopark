const Stack = ({ height, color }) => {
    const styleObj = {
        width: `10px`,
        height: `${height}%`,
        backgroundColor: `${color}`
    }
    return (
        <div style={styleObj}></div>
    );
}

export default Stack;
