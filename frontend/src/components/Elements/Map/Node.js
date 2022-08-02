import { useState } from 'react';

import classes from './Node.module.css';

const Node = ({ grid, setGrid, row, col, isStart, isEnd, isWall }) => {
    const [wall, setWall] = useState(isWall);

    const handleClick = () => {
        if (!wall) {
            setWall(true);
            const updatedGrid = grid.slice();
            updatedGrid[row][col].isWall = true;
            setGrid(updatedGrid);
        }
    }

    return (
        <span id={`node-${row}-${col}`} className={`
            ${classes.cell}
            ${
                isStart ? classes.startCell
                : isEnd ? classes.endCell
                : wall ? classes.wallCell : '' }
        `}
        onClick={() => handleClick()}>
        </span>
    );
}

export default Node;
