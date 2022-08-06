import { useSelector, useDispatch } from "react-redux";

import { setMapThunk } from "../../../store/session";
import { thunkCreateMap, thunkDeleteMap } from "../../../store/maps";
import {
    thunkCreateManyObjects
} from "../../../store/objects";

import classes from './TemplateList.module.css';

const TemplateList = ({ playing }) => {
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

    const handleDelete = (mapId) => {
        if (playing) return;
        (async() => {
            await dispatch(thunkDeleteMap(mapId));
            if (curMap === mapId) {
                await dispatch(setMapThunk(null));
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
                            `}>
                            <div
                                className={`
                                    ${classes.listButton}
                                `}
                                onClick={() => handleMapChange(map.id)}
                            >{map.name}</div>
                            <i
                                className={`fa-solid fa-xmark ${classes.x}`}
                                onClick={() => (!playing?handleDelete(map.id):null)}
                            ></i>
                        </li>
                    )
                })}
                <li className={classes.listItem}>
                    <div
                        className={classes.listButton}
                        onClick={() => handleCreateBlank()}
                    >+ Blank Template</div>
                </li>
            </ul>
        </div>
    );
}

export default TemplateList;
