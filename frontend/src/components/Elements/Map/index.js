import { useState, useEffect } from 'react';

import Node from './Node';

import { dijkstras, getPath } from '../../../Algorithms/dijkstras';
import classes from './Map.module.css';
import nodeClasses from './Node.module.css';

const Map = () => {
    const width = 32;
    const height = 17;

    const startRow = 2;
    const startCol = 2;
    const endRow = 10;
    const endCol = 18;
    const speed = 10;

    const [grid, setGrid] = useState([]);

    const nodeTemplate = (row, col) => {
        return {
            row,
            col,
            isStart: row===startRow && col===startCol,
            isEnd: row===endRow && col===endCol,
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

    const resetGrid = (grid) => {
        grid.forEach(row => {
            row.forEach(cell => {
                const domEle = document.getElementById(
                    `node-${cell.row}-${cell.col}`
                );

                // remove visited cell effect
                if (domEle.className.includes(nodeClasses.visited)) {
                    domEle.className = domEle.className
                    .split(nodeClasses.visited).join(' ');
                }

                // remove path cell effect
                if (domEle.className.includes(nodeClasses.pathCell)) {
                    domEle.className = domEle.className
                    .split(nodeClasses.pathCell).join(' ');
                }
            })
        })
    }

    const animateVisited = (visitedNodesArr, pathArr) => {
        resetGrid(grid);
        for (let i = 0; i <= visitedNodesArr.length; i++) {
            // animate path
            if (i === visitedNodesArr.length) { // hit end node
                setTimeout(() => {
                    animatePath(pathArr)
                }, speed * i);
                return;
            }
            // animate search
            setTimeout(() => {
                const curNode = visitedNodesArr[i];
                document.getElementById(`node-${curNode.row}-${curNode.col}`)
                .className += (' ' + nodeClasses.visited);
            }, speed * i);
        }
    }

    const animatePath = (path) => {
        path.forEach((ele, i) => {
            const domEle = document.getElementById(`node-${ele.row}-${ele.col}`);
            setTimeout(() => {
                // remove visited cell effect
                domEle.className = domEle.className
                .split(nodeClasses.visited).join(' ');

                // add new path effect
                domEle.className += (` ${nodeClasses.pathCell}`);

            }, speed+25 * i)
        });
    }

    const handlePlay = () => {
        const startNode = grid[startRow][startCol];
        const endNode = grid[endRow][endCol];
        const visitedNodes = dijkstras(grid, startNode, endNode);
        const pathArr = getPath(endNode);
        animateVisited(visitedNodes, pathArr);
    }

    return (
        <div className={classes.gridContainer}>
            <button onClick={() => handlePlay()}>PLAY</button>
            {grid.map((row, i) => (
                <div className={classes.rowContainer} key={`row-${i}`}>
                    {row.map((node, i) => (
                        <Node
                            key={`node-${i}`}
                            grid={grid}
                            setGrid={setGrid}
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
