import { useSelector, useDispatch } from "react-redux";

import { setMapThunk } from "../../../store/session";
import { thunkCreateMap, thunkDeleteMap } from "../../../store/maps";
import {
    thunkCreateManyObjects
} from "../../../store/objects";

import classes from './TemplateList.module.css';

const TemplateList = () => {
    const dispatch = useDispatch();
    const maps = useSelector((state) => state.maps);
    const session = useSelector((state) => state.session);
    const curMap = useSelector((state) => state.session.currentMap);

    const handleMapChange = (mapId) => {
        (async() => {
            await dispatch(setMapThunk(mapId));
        })();
    }

    const handleDelete = (mapId) => {
        (async() => {
            await dispatch(thunkDeleteMap(mapId));
            if (curMap === mapId) {
                await dispatch(setMapThunk(null));
            }
        })();
    }

    const handleCreateBlank = () => {
        (async () => {
            const map = {
                name: 'New Map',
                ownerId: session.user.id
            }
            const newMapId = await dispatch(thunkCreateMap(map));
            await dispatch(thunkCreateManyObjects({objects: {}, mapId: newMapId}));
            await dispatch(setMapThunk(newMapId));
        })();
    }

    return (
        <div>
            TEMPLATE LIST:
            <ul>
                {Object.values(maps).map((map, i) => {
                    return (
                        <li key={`map-${i}`}>
                            <button
                                className={`
                                    ${(curMap===map.id?classes.selected:'')}
                                `}
                                onClick={() => handleMapChange(map.id)}
                            >{map.name}</button>
                            <i
                                className={`fa-solid fa-xmark ${classes.x}`}
                                onClick={() => handleDelete(map.id)}
                            ></i>
                        </li>
                    )
                })}
                <li>
                    <button
                        onClick={() => handleCreateBlank()}
                    >+ Blank Template</button>
                </li>
            </ul>
        </div>
    );
}

export default TemplateList;
