import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMapThunk } from "../../../store/session";
import { thunkCreateMap } from "../../../store/maps";
import {
    thunkCreateManyObjects,
    thunkUpdateManyObjects
} from "../../../store/objects";

import classes from './MapTools.module.css';
import EditMapForm from './EditMapForm';
import TutorialModal from './Tutorial';

const MapTools = ({
    grid,
    playing,
    clear,
    setClear,
    tool,
    setTool,
    handlePlay,
    handleClear,
    editName,
    setEditName,
    pathErr,
    setPathErr,
    tutorial,
    setTutorial
    }) => {

    const dispatch = useDispatch();
    const session = useSelector((state) => state.session);
    const maps = useSelector((state) => state.maps);

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
                if (cell.isSlow) {
                    objects[`${x}-${y}`] = {
                        xPos: cell.col,
                        yPos: cell.row,
                        typeId: 4
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

    useEffect(() => {
        if (pathErr) {
            setTimeout(() => {
                setPathErr(false);
            }, 6000);
        }
    }, [pathErr, setPathErr])

    return (
        <div className={classes.navContainer}>
            <span className={classes.templateNameContainer}>
                {!editName ?
                    (maps[session.currentMap] ?
                    <span>
                    {maps[session.currentMap].name}
                    <i
                        className={`fa-solid fa-pen-to-square ${classes.editName}`}
                        onClick={() => setEditName(true)}
                    />
                    </span>
                    : 'No template selected')
                : <EditMapForm
                    setEditName={setEditName}
                    map={maps[session.currentMap]}
                    />}
                <span className={!pathErr?classes.noPathErr:classes.pathErr}>No path found</span>
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
                    <button
                        disabled={playing}
                        className={`
                            ${classes.toolButton}
                            ${(tool===4?classes.selected:'')}
                        `}
                        onClick={() => (tool!==4?setTool(4):setTool(null))}
                    >
                        <div className={`${classes.toolBlockLabel} ${classes.slow}`}></div>
                        Slow Cell
                    </button>
                </section>
                <span
                    className={classes.tutButton}
                    onClick={() => setTutorial(true)}
                >
                    <i className="fa-solid fa-question"></i>
                </span>
                <section className={classes.controlContainer}>
                    <button
                        className={classes.controlButton}
                        disabled={playing}
                        onClick={() => handlePlay()}
                    >PLAY</button>
                    <button
                        className={classes.controlButton}
                        disabled={playing}
                        onClick={() => doClear()}
                    >CLEAR</button>
                    <button
                        className={classes.controlButton}
                        disabled={playing}
                        onClick={() => (
                            session.currentMap ? handleSave() : handleCreate())}
                    >SAVE</button>
                </section>
            </div>
            {tutorial ?
                <TutorialModal setTutorial={setTutorial}/>
            : null}
        </div>
    );
}

export default MapTools;
