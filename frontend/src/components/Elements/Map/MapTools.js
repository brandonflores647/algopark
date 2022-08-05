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
    tool,
    setTool,
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
                <section className={classes.toolContainer}>
                    <span>Tools:</span>
                    <button
                        disabled={playing}
                        className={`
                        ${classes.toolButton}
                        ${(tool===2?classes.selected:'')}
                        `}
                        onClick={() => (tool!==2?setTool(2):setTool(null))}
                    >
                        <div className={`${classes.toolBlockLabel} ${classes.start}`}></div>
                        Start Cell
                    </button>
                    <button
                        disabled={playing}
                        className={`
                            ${classes.toolButton}
                            ${(tool===3?classes.selected:'')}
                            `}
                            onClick={() => (tool!==3?setTool(3):setTool(null))}
                    >
                        <div className={`${classes.toolBlockLabel} ${classes.end}`}></div>
                        End Cell
                    </button>
                    <button
                        disabled={playing}
                        className={`
                            ${classes.toolButton}
                            ${(tool===1?classes.selected:'')}
                        `}
                        onClick={() => (tool!==1?setTool(1):setTool(null))}
                    >
                        <div className={`${classes.toolBlockLabel} ${classes.wall}`}></div>
                        Wall Cell
                    </button>
                </section>
                <section className={classes.controlContainer}>
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
                        onClick={() => (
                            session.currentMap ? handleSave() : handleCreate())}
                    >SAVE</button>
                </section>
            </div>
        </div>
    );
}

export default MapTools;
