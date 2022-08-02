import Node from './Node';

import classes from './Map.module.css';

const Map = () => {
    const width = 32;
    const height = 17;

    const grid = [];

    for (let i = 0; i < height; i++) {
        const newRow = [];
        for (let j = 0; j < width; j++) {
            newRow.push(<Node />);
        }
        grid.push(newRow);
    }

    return (
        <div className={classes.gridContainer}>
            {grid.map((row, i) => (
                <div className={classes.rowContainer} key={`row-${i}`}>
                    {row}
                </div>
            ))}
        </div>
    );
}

export default Map;
