import { useSelector } from "react-redux";

const TemplateList = () => {
    const maps = useSelector((state) => state.maps);

    return (
        <div>
            TEMPLATE LIST:
            <ul>
                {Object.values(maps).map((map, i) => {
                    return (
                        <li key={`map-${i}`}>
                            <button>{`${map.name} - id:${map.id}`}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default TemplateList;
