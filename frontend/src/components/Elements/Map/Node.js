import { useState, useEffect, useRef } from 'react';

import classes from './Node.module.css';

const Node = ({ grid, setGrid, row, col, isStart, isEnd, isWall }) => {
    const [wallVisual, setWallVisual] = useState(isWall);

    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        const handleClick = (e) => {
            if (e.buttons===1 && !isStart && !isEnd) {
                setWallVisual(true);
                const updatedGrid = grid.slice();
                updatedGrid[row][col].isWall = true;
                setGrid(updatedGrid);
            }
            if (e.buttons===2 && !isStart && !isEnd) {
                setWallVisual(false);
                const updatedGrid = grid.slice();
                updatedGrid[row][col].isWall = false;
                setGrid(updatedGrid);
            }
        }

        const stopMenu = (e) => e.preventDefault();

        element.addEventListener('mouseover', handleClick);
        document.addEventListener('contextmenu', stopMenu);

        return () => {
            element.removeEventListener('mouseover', handleClick);
            document.removeEventListener('contextmenu', stopMenu);
        }
    }, []);

    return (
        <span id={`node-${row}-${col}`} className={`
            ${classes.cell}
            ${
                isStart ? classes.startCell
                : isEnd ? classes.endCell
                : wallVisual ? classes.wallCell : '' }
        `}
            ref={ref}>
        </span>
    );
}

export default Node;
