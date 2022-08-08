import { useEffect, useRef } from 'react';

import classes from './Node.module.css';

const Node = ({
        grid,
        setGrid,
        startCell,
        setStartCell,
        endCell,
        setEndCell,
        hidePath,
        setHidePath,
        tool,
        playing,
        curMap,
        row,
        col,
        isStart,
        isEnd,
        isWall,
        isSlow,
        slowCellSpeed }) => {

    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        const handleClick = (e) => {
            if (tool === 1) {
                // wall create
                if (e.buttons===1 && !isStart && !isEnd && !isSlow && !playing) {
                    if (element.className.includes('pathCell')) {
                        setHidePath(true)
                    }
                    const updatedGrid = grid.slice();
                    updatedGrid[row][col].isWall = true;
                    setGrid(updatedGrid);
                }
                // wall delete
                if (e.buttons===2 && !isStart && !isEnd && !isSlow && !playing) {
                    const updatedGrid = grid.slice();
                    updatedGrid[row][col].isWall = false;
                    setGrid(updatedGrid);
                }
            }
            if (tool === 2) {
                // start re-position
                if (e.buttons===1 && !isEnd && !isWall && !playing) {
                    if (!hidePath) setHidePath(true);
                    const updatedGrid = grid.slice();
                    const oldStartCell = updatedGrid[startCell[1]][startCell[0]];
                    oldStartCell.isStart = false;
                    updatedGrid[row][col].isStart = true;
                    setStartCell([col, row]);
                    setGrid(updatedGrid);
                }
            }
            if (tool === 3) {
                // end re-position
                if (e.buttons===1 && !isStart && !isWall && !playing) {
                    if (!hidePath) setHidePath(true);
                    const updatedGrid = grid.slice();
                    const oldEndCell = updatedGrid[endCell[1]][endCell[0]];
                    oldEndCell.isEnd = false;
                    updatedGrid[row][col].isEnd = true;
                    setEndCell([col, row]);
                    setGrid(updatedGrid);
                }
            }
            if (tool === 4) {
                // slow create
                if (e.buttons===1 && !isStart && !isEnd && !isWall && !playing) {
                    if (element.className.includes('pathCell')) {
                        setHidePath(true)
                    }
                    const updatedGrid = grid.slice();
                    updatedGrid[row][col].isSlow = true;
                    updatedGrid[row][col].speedMultiplier = slowCellSpeed;
                    setGrid(updatedGrid);
                }
                // slow delete
                if (e.buttons===2 && !isStart && !isEnd && !isWall && !playing) {
                    if (element.className.includes('pathCell')) {
                        setHidePath(true)
                    }
                    const updatedGrid = grid.slice();
                    updatedGrid[row][col].isSlow = false;
                    updatedGrid[row][col].speedMultiplier = 1;
                    setGrid(updatedGrid);
                }
            }
        }
        const justClick = (e) => {
            const element = ref.current;
            // wall create
            if (tool === 1 && !isStart && !isEnd && !isSlow && !playing) {
                if (element.className.includes('pathCell')) {
                    setHidePath(true)
                }
                const updatedGrid = grid.slice();
                updatedGrid[row][col].isWall = true;
                setGrid(updatedGrid);
            }
            // wall delete
            if (tool === 1 && e.buttons===2 && !isStart && !isEnd && !isSlow && !playing) {
                const updatedGrid = grid.slice();
                updatedGrid[row][col].isWall = false;
                setGrid(updatedGrid);
            }
            // slow create
            if (tool === 4 && !isStart && !isEnd && !isWall && !playing) {
                if (element.className.includes('pathCell')) {
                    setHidePath(true)
                }
                const updatedGrid = grid.slice();
                updatedGrid[row][col].isSlow = true;
                setGrid(updatedGrid);
            }
            // slow delete
            if (tool === 4 && e.buttons===2 && !isStart && !isEnd && !isWall && !playing) {
                const updatedGrid = grid.slice();
                updatedGrid[row][col].isSlow = false;
                setGrid(updatedGrid);
            }
        }

        const stopMenu = (e) => e.preventDefault();

        element.addEventListener('mouseover', handleClick);
        element.addEventListener('mousedown', justClick);
        document.addEventListener('contextmenu', stopMenu);

        return () => {
            element.removeEventListener('mouseover', handleClick);
            element.removeEventListener('mousedown', justClick);
            document.removeEventListener('contextmenu', stopMenu);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing, tool, startCell, endCell, curMap]);

    return (
        <span id={`node-${row}-${col}`} className={`
            ${classes.cell}
            ${
                isStart ? classes.startCell
                : isEnd ? classes.endCell
                : isWall ? classes.wallCell
                : isSlow ? classes.slowCell : '' }
        `}
            ref={ref}>
        </span>
    );
}

export default Node;
