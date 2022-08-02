import { useState, useEffect } from 'react';

import Node from './Node';

import { dijkstras } from '../../../Algorithms/dijkstras';
import classes from './Map.module.css';
import nodeClasses from './Node.module.css';

const Map = () => {
    const width = 32;
    const height = 17;

    const startRow = 2;
    const startCol = 2;
    const endRow = 5;
    const endCol = 12;

    const [grid, setGrid] = useState([]);
    const [visitedGrid, setVisitedGrid] = useState([]);

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
                if (domEle.className.includes(nodeClasses.visited)) {
                    document.getElementById(`node-${cell.row}-${cell.col}`)
                    .className = document.getElementById(`node-${cell.row}-${cell.col}`)
                    .className.split(nodeClasses.visited).join('\n');
                }
            })
        })
    }

    const animateVisited = (visitedNodesArr) => {
        resetGrid(grid);
        for (let i = 0; i < visitedNodesArr.length; i++) {
            setTimeout(() => {
                const curNode = visitedNodesArr[i];
                const newGrid = grid.slice();
                const newNode = {...curNode};
                document.getElementById(`node-${newNode.row}-${newNode.col}`)
                .className += (' ' + nodeClasses.visited);
                newGrid[curNode.row][curNode.col] = newNode;
                setVisitedGrid(newGrid);
            }, 10 * i);
        }
    }

    const handlePlay = () => {
        const startNode = grid[startRow][startCol];
        const endNode = grid[endRow][endCol];
        const visitedNodes = dijkstras(grid, startNode, endNode);
        animateVisited(visitedNodes);
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
