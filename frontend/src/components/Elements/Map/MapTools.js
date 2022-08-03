import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateMap } from "../../../store/maps";

const MapTools = ({
    grid,
    playing,
    clear,
    setClear,
    handlePlay,
    handleClear }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const doClear = () => {
        handleClear(grid)
        setClear(!clear)
    }

    const handleSave = () => {
        (async () => {
            await dispatch(thunkCreateMap({
                name: 'New Map',
                ownerId: user.id
            }))
        })();
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
            <button
                disabled={playing}
                onClick={() => handleSave()}
            >SAVE</button>
        </div>
    );
}

export default MapTools;
