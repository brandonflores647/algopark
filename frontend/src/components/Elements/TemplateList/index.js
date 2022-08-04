import { useSelector, useDispatch } from "react-redux";

import { setMapThunk } from "../../../store/session";

import classes from './TemplateList.module.css';

const TemplateList = () => {
    const dispatch = useDispatch();
    const maps = useSelector((state) => state.maps);

    const handleMapChange = (mapId) => {
        (async() => {
            await dispatch(setMapThunk(mapId));
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
                                onClick={() => handleMapChange(map.id)}
                            >{`${map.name} - id:${map.id}`}</button>
                            <i className={`fa-solid fa-xmark ${classes.x}`}></i>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default TemplateList;
