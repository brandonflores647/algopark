import { useEffect, useRef } from 'react';

import classes from './Node.module.css';

const Node = ({
        grid,
        setGrid,
        startCell,
        setStartCell,
        endCell,
        setEndCell,
        tool,
        playing,
        curMap,
        row,
        col,
        isStart,
        isEnd,
        isWall }) => {

    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        const handleClick = (e) => {
            if (tool === 1) {
                // wall create
                if (e.buttons===1 && !isStart && !isEnd && !playing) {
                    const updatedGrid = grid.slice();
                    updatedGrid[row][col].isWall = true;
                    setGrid(updatedGrid);
                }
                // wall delete
                if (e.buttons===2 && !isStart && !isEnd && !playing) {
                    const updatedGrid = grid.slice();
                    updatedGrid[row][col].isWall = false;
                    setGrid(updatedGrid);
                }
            }
            if (tool === 3) {
                // end re-position
                if (e.buttons===1 && !isStart && !isWall && !playing) {
                    const updatedGrid = grid.slice();
                    const oldEndCell = updatedGrid[endCell[1]][endCell[0]];
                    oldEndCell.isEnd = false;
                    updatedGrid[row][col].isEnd = true;
                    setEndCell([col, row]); // potential removal
                    setGrid(updatedGrid);
                }
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
    }, [playing, tool, endCell, curMap]);

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
