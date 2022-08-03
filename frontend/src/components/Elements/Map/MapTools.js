import { useDispatch, useSelector } from 'react-redux';
import { setMapThunk } from "../../../store/session";
import { thunkCreateMap } from "../../../store/maps";

const MapTools = ({
    grid,
    playing,
    clear,
    setClear,
    handlePlay,
    handleClear }) => {

    const dispatch = useDispatch();
    const session = useSelector((state) => state.session);

    const doClear = () => {
        handleClear(grid)
        setClear(!clear)
    }

    const handleSave = () => {
        if (session.currentMap) {
            console.log('TODO: ADD SAVE')
            return;
        }
        (async () => {
            const newMapId = await dispatch(thunkCreateMap({
                name: 'New Map',
                ownerId: session.user.id
            }))
            await dispatch(setMapThunk(newMapId))
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
