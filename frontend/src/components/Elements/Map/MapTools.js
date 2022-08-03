const MapTools = ({ playing, handlePlay }) => {
    return (
        <button
            disabled={playing}
            onClick={() => handlePlay()}
        >PLAY</button>
    );
}

export default MapTools;
