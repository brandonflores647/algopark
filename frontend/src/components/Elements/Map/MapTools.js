import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMapThunk } from "../../../store/session";
import { thunkCreateMap } from "../../../store/maps";
import {
    thunkCreateManyObjects,
    thunkUpdateManyObjects
} from "../../../store/objects";

import classes from './MapTools.module.css';
import EditMapForm from './EditMapForm';

const MapTools = ({
    grid,
    playing,
    clear,
    setClear,
    handlePlay,
    handleClear }) => {

    const dispatch = useDispatch();
    const session = useSelector((state) => state.session);
    const maps = useSelector((state) => state.maps);

    const [editName, setEditName] = useState(false);

    const doClear = () => {
        handleClear(grid)
        setClear(!clear)
    }

    const getObjects = () => {
        const objects = {};
        grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell.isWall) {
                    objects[`${x}-${y}`] = {
                        xPos: cell.col,
                        yPos: cell.row,
                        typeId: 1
                    }
                }
                if (cell.isStart) {
                    objects[`${x}-${y}`] = {
                        xPos: cell.col,
                        yPos: cell.row,
                        typeId: 2
                    }
                }
                if (cell.isEnd) {
                    objects[`${x}-${y}`] = {
                        xPos: cell.col,
                        yPos: cell.row,
                        typeId: 3
                    }
                }
            });
        });
        return objects;
    }

    const handleSave = () => {
        (async () => {
            const mapId = session.currentMap;
            const newObjects = getObjects();
            const oldObjects = maps[mapId].objects;
            await dispatch(
                thunkUpdateManyObjects(mapId, newObjects, oldObjects)
            );
        })();
    }

    const handleCreate = () => {
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
            await dispatch(setMapThunk(newMapId));
        })();
    }


    return (
        <div className={classes.navContainer}>
            <span className={classes.templateNameContainer}>
                {!editName ?
                    (maps[session.currentMap] ?
                    <>
                    {maps[session.currentMap].name}
                    <i
                        className={`fa-solid fa-pen-to-square ${classes.editName}`}
                        onClick={() => setEditName(true)}
                    />
                    </>
                    : 'No template selected')
                : <EditMapForm
                    setEditName={setEditName}
                    map={maps[session.currentMap]}
                    />}
            </span>
            <div className={classes.navButtons}>
                <button
                    disabled={playing}
                    onClick={() => handlePlay()}
                >PLAY</button>
                <button
                    disabled={playing}
                    onClick={() => doClear()}
                >CLEAR</button>
                {session.currentMap ?
                    <button
                        disabled={playing}
                        onClick={() => handleSave()}
                    >SAVE</button> : null}
                <button
                    disabled={playing}
                    onClick={() => handleCreate()}
                >NEW TEMPLATE</button>
            </div>
        </div>
    );
}

export default MapTools;
