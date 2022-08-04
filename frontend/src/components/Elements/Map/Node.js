import { useEffect, useRef } from 'react';

import classes from './Node.module.css';

const Node = ({
        grid,
        setGrid,
        playing,
        row,
        col,
        isStart,
        isEnd,
        isWall }) => {

    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        const handleClick = (e) => {
            if (e.buttons===1 && !isStart && !isEnd && !playing) {
                const updatedGrid = grid.slice();
                updatedGrid[row][col].isWall = true;
                setGrid(updatedGrid);
            }
            if (e.buttons===2 && !isStart && !isEnd && !playing) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing]);

    return (
        <span id={`node-${row}-${col}`} className={`
            ${classes.cell}
            ${
                isStart ? classes.startCell
                : isEnd ? classes.endCell
                : isWall ? classes.wallCell : '' }
        `}
            ref={ref}>
        </span>
    );
}

export default Node;
