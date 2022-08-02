import { useState, useEffect } from 'react';

import Node from './Node';

import classes from './Map.module.css';

const Map = () => {
    const width = 32;
    const height = 17;

    const [grid, setGrid] = useState([]);

    const nodeTemplate = (row, col) => {
        return {
            row,
            col,
            isStart: row===2 && col===2,
            isEnd: row===14 && col===29,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previous: null
        };
    }

    useEffect(() => {
        const oldGrid = [];
        for (let i = 0; i < height; i++) {
            const newRow = [];
            for (let j = 0; j < width; j++) {
                newRow.push(nodeTemplate(i, j));
            }
            oldGrid.push(newRow);
        }
        setGrid(oldGrid);
    }, []);

    const handlePlay = () => {
        console.log('clicked!!!')
    }

    return (
        <div className={classes.gridContainer}>
            <button onClick={() => handlePlay()}>PLAY</button>
            {grid.map((row, i) => (
                <div className={classes.rowContainer} key={`row-${i}`}>
                    {row.map((node, i) => (
                        <Node
                            key={`node-${i}`}
                            row={node.row}
                            col={node.col}
                            isStart={node.isStart}
                            isEnd={node.isEnd}
                            isWall={node.isWall}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Map;
