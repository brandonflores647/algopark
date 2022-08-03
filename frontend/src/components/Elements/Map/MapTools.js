import { useDispatch, useSelector } from 'react-redux';
import { setMapThunk } from "../../../store/session";
import { thunkCreateMap } from "../../../store/maps";
import { thunkCreateManyObjects } from "../../../store/objects";

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

    const getObjects = () => {
        const objects = {};
        grid.forEach(row => {
            row.forEach((cell, i) => {
                if (cell.isWall) {
                    objects[i] = {
                        x: cell.col,
                        y: cell.row,
                        typeId: 1
                    }
                }
                if (cell.isStart) {
                    objects[i] = {
                        x: cell.col,
                        y: cell.row,
                        typeId: 2
                    }
                }
                if (cell.isEnd) {
                    objects[i] = {
                        x: cell.col,
                        y: cell.row,
                        typeId: 3
                    }
                }
            });
        });
        return objects;
    }

    const handleSave = () => {
        if (session.currentMap) {
            console.log('TODO: UPDATE MAP')
            return;
        }
        (async () => {
            const map = {
                name: 'New Map',
                ownerId: session.user.id
            }
            const newMapId = await dispatch(thunkCreateMap(map));
            const objects = {
                objects: getObjects(),
                mapId: newMapId
            }
            await dispatch(thunkCreateManyObjects(objects))
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
