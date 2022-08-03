const MapTools = ({
    grid,
    playing,
    clear,
    setClear,
    handlePlay,
    handleClear }) => {

    const doClear = () => {
        handleClear(grid)
        setClear(!clear)
    }

    return (
        <div>
            <button
                disabled={playing}
                onClick={() => handlePlay()}
            >PLAY</button>
            <button
                disabled={playing}
                onClick={() => doClear()}
            >CLEAR</button>
        </div>
    );
}

export default MapTools;
