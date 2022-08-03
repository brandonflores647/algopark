import { useSelector, useDispatch } from "react-redux";

import { setMapThunk } from "../../../store/session";

const TemplateList = () => {
    const dispatch = useDispatch();
    const maps = useSelector((state) => state.maps);

    const handleNewMap = (mapId) => {
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
                                onClick={() => handleNewMap(map.id)}
                            >{`${map.name} - id:${map.id}`}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default TemplateList;
