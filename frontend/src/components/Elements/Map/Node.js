import { useState } from 'react';

import classes from './Node.module.css';

const Node = ({ grid, setGrid, row, col, isStart, isEnd, isWall }) => {
    const [wallVisual, setWallVisual] = useState(isWall);

    const handleClick = () => {
        if (!wallVisual && !isStart && !isEnd) {
            setWallVisual(true);
            const updatedGrid = grid.slice();
            updatedGrid[row][col].isWall = true;
            setGrid(updatedGrid);
        } else {
            setWallVisual(false);
            const updatedGrid = grid.slice();
            updatedGrid[row][col].isWall = false;
            setGrid(updatedGrid);
        }
    }

    return (
        <span id={`node-${row}-${col}`} className={`
            ${classes.cell}
            ${
                isStart ? classes.startCell
                : isEnd ? classes.endCell
                : wallVisual ? classes.wallCell : '' }
        `}
        onClick={() => handleClick()}>
        </span>
    );
}

export default Node;
