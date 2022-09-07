import { useSelector, useDispatch } from "react-redux";

import { setMapThunk } from "../../../store/session";
import { thunkCreateMap, thunkDeleteMap } from "../../../store/maps";
import { thunkCreateManyObjects } from "../../../store/objects";

import classes from './TemplateList.module.css';
import XButton from "./xButton";

const TemplateList = ({ playing, setEditName }) => {
    const dispatch = useDispatch();
    const maps = useSelector((state) => state.maps);
    const session = useSelector((state) => state.session);
    const curMap = useSelector((state) => state.session.currentMap);

    const handleMapChange = (mapId) => {
        if (playing) return;
        (async() => {
            await dispatch(setMapThunk(mapId));
        })();
    }

    const handleDelete = (mapId, mapName, e) => {
        e.stopPropagation();
        if (playing) return;
        (async() => {
            await setEditName(false);
            if (window.confirm(`Deleting '${mapName}', are you sure?`)) {
                await dispatch(thunkDeleteMap(mapId));
                if (curMap === mapId) {
                    await dispatch(setMapThunk(null));
                }
            } else {
                return;
            }
        })();
    }

    const handleCreateBlank = () => {
        if (playing) return;
        (async () => {
            const map = {
                name: 'New Map',
                ownerId: session.user.id
            }
            const newMapId = await dispatch(thunkCreateMap(map));
            await dispatch(thunkCreateManyObjects({objects: {
                '2-2': {typeId:2,xPos:2,yPos:2},
                '28-15': {typeId:3,xPos:28,yPos:15}
            }, mapId: newMapId}));
            await dispatch(setMapThunk(newMapId));
        })();
    }

    return (
        <div className={classes.templateListContainer}>
            <span className={classes.templateListTitle}>My Templates:</span>
            <ul className={classes.listContainer}>
                {Object.values(maps).map((map, i) => {
                    return (
                        <li key={`map-${i}`} className={`
                                ${classes.listItem}
                                ${(curMap===map.id?classes.selected:'')}
                            `}
                            onClick={() => handleMapChange(map.id)}>
                            <div
                                className={`
                                    ${classes.listButton}
                                `}
                            >{map.name}</div>
                            <XButton
                                handleDelete={handleDelete}
                                playing={playing}
                                map={map}
                            />
                        </li>
                    );
                })}
                {Object.keys(maps).length < 20 ?
                <li
                    className={classes.listItem}
                    onClick={() => handleCreateBlank()}
                >
                    <div className={classes.listButton}
                    >+ Blank Template</div>
                </li>
                :
                <li style={{textAlign: 'center'}}>
                    User's are limited to 20 templates.
                </li>}
            </ul>
        </div>
    );
}

export default TemplateList;
