import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MapTools from './MapTools';
import Node from './Node';

import { dijkstras, getPath } from '../../../Algorithms/dijkstras';
import classes from './Map.module.css';
import nodeClasses from './Node.module.css';

const Map = () => {
    const maps = useSelector((state) => state.maps);
    const curMap = useSelector((state) => state.session.currentMap);

    const width = 32;
    const height = 17;

    const [startCell, setStartCell] = useState([2, 2]); // x, y
    const [endCell, setEndCell] = useState([28, 15]); // x, y
    const speed = 10;

    const [grid, setGrid] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [clear, setClear] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const nodeTemplate = (row, col) => {
        return {
            row,
            col,
            isStart: row===startCell[1] && col===startCell[0],
            isEnd: row===endCell[1] && col===endCell[0],
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleStartEndWipe(grid);
        handleClear(grid);
        setClear(!clear);
        if (maps[curMap] && maps[curMap].objects) {
            const objects = Object.values(maps[curMap].objects)
            const newGrid = [...grid];
            objects.forEach(obj => {
                if (obj.typeId === 1) {
                    newGrid[obj.yPos][obj.xPos].isWall = true;
                }
                if (obj.typeId === 2) {
                    newGrid[obj.yPos][obj.xPos].isStart = true;
                }
                if (obj.typeId === 3) {
                    newGrid[obj.yPos][obj.xPos].isEnd = true;
                }
            });
            const startNode = Object.values(maps[curMap].objects).find(ele => ele.typeId===2);
            const endNode = Object.values(maps[curMap].objects).find(ele => ele.typeId===3);
            setStartCell([startNode.xPos, startNode.yPos]);
            newGrid[startNode.yPos][startNode.xPos].isStart = true;
            setEndCell([endNode.xPos, endNode.yPos]);
            newGrid[endNode.yPos][endNode.xPos].isEnd = true;
        }
        if (!curMap && grid.length) {
            const newGrid = [...grid];
            setStartCell([2, 2]);
            newGrid[2][2].isStart = true;
            setEndCell([28, 15]);
            newGrid[15][28].isEnd = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curMap])

    const replayCleanup = (grid) => {
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

                cell.isVisited = false;
                cell.distance = Infinity;
                cell.previous = null;
            })
        })
    }

    const animateVisited = (visitedNodesArr, pathArr) => {
        replayCleanup(grid);
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
        setPlaying(false);
    }

    const handlePlay = () => {
        const startNode = grid[startCell[1]][startCell[0]];
        const endNode = grid[endCell[1]][endCell[0]];
        const visitedNodes = dijkstras(grid, startNode, endNode);
        const pathArr = getPath(endNode);
        animateVisited(visitedNodes, pathArr);
        setPlaying(true);
    }
    const handleClear = (grid) => {
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

                cell.isWall = false;
                cell.isVisited = false;
                cell.distance = Infinity;
                cell.previous = null;
            });
        });
    }
    const handleStartEndWipe = (grid) => {
        grid.forEach(row => {
            row.forEach(cell => {
                cell.isStart = false;
                cell.isEnd = false;
            });
        });
    }

    return (
        <div className={classes.mainContainer}>
        <MapTools
            grid={grid}
            playing={playing}
            clear={clear}
            setClear={setClear}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            handlePlay={handlePlay}
            handleClear={handleClear}
        />
        <div className={classes.gridContainer} style={{cursor:(playing?'not-allowed':'pointer')}}>
            {grid.map((row, i) => (
                <div className={classes.rowContainer} key={`row-${i}`}>
                    {row.map((node, i) => (
                        <Node
                            key={`node-${i}`}
                            grid={grid}
                            setGrid={setGrid}
                            startCell={startCell}
                            setStartCell={setStartCell}
                            endCell={endCell}
                            setEndCell={setEndCell}
                            isDragging={isDragging}
                            playing={playing}
                            curMap={curMap}
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
        </div>
    );
}

export default Map;
