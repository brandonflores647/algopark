import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MapTools from './MapTools';
import Node from './Node';

import { dijkstras, getPath } from '../../../Algorithms/dijkstras';
import classes from './Map.module.css';
import nodeClasses from './Node.module.css';

const Map = ({ playing, setPlaying, editName, setEditName, tutorial, setTutorial }) => {
    const maps = useSelector((state) => state.maps);
    const curMap = useSelector((state) => state.session.currentMap);

    const width = 32;
    const height = 17;

    const [startCell, setStartCell] = useState([2, 2]); // x, y
    const [endCell, setEndCell] = useState([28, 15]); // x, y
    const speed = 10;
    const slowCellSpeed = 4;

    const [grid, setGrid] = useState([]);
    const [clear, setClear] = useState(false);
    const [tool, setTool] = useState(null);
    const [hidePath, setHidePath] = useState(false);
    const [pathErr, setPathErr] = useState(false);

    const nodeTemplate = (row, col) => {
        return {
            row,
            col,
            isStart: row===startCell[1] && col===startCell[0],
            isEnd: row===endCell[1] && col===endCell[0],
            distance: Infinity,
            isVisited: false,
            isWall: false,
            isSlow: false,
            speedMultiplier: 1,
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
                if (obj.typeId === 4) {
                    newGrid[obj.yPos][obj.xPos].isSlow = true;
                    newGrid[obj.yPos][obj.xPos].speedMultiplier = slowCellSpeed; // higher === slower
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

    useEffect(() => {
        if (hidePath) {
            handleHidePath(grid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hidePath])

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

                // remove hidden path effect
                if (domEle.className.includes(nodeClasses.hiddenPath)) {
                    domEle.className = domEle.className
                    .split(nodeClasses.hiddenPath).join(' ');
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
                const domEle = document.getElementById(`node-${curNode.row}-${curNode.col}`);
                if (domEle) {
                    domEle.className += (' ' + nodeClasses.visited);
                }
            }, speed * i);
        }
    }

    const animatePath = (path) => {
        if (!path.length) {
            setPathErr(true);
        }
        path.forEach((ele, i) => {
            const domEle = document.getElementById(`node-${ele.row}-${ele.col}`);
            setTimeout(() => {
                if (domEle) {
                    // remove visited cell effect
                    domEle.className = domEle.className
                    .split(nodeClasses.visited).join(' ');

                    // add new path effect
                    domEle.className += (` ${nodeClasses.pathCell}`);
                }
            }, speed+25 * i);
        });
        setTimeout(() => {
            setPlaying(false);
        }, 1300);
    }

    const handleHidePath = (grid) => {
        grid.forEach(row => {
            row.forEach((ele, i) => {
                const domEle = document.getElementById(`node-${ele.row}-${ele.col}`);
                if (domEle.className.includes(`${nodeClasses.pathCell}`)) {
                    // add hidden path class
                    domEle.className += (` ${nodeClasses.hiddenPath}`);
                }
            })
        });
    }

    const handlePlay = () => {
        const startNode = grid[startCell[1]][startCell[0]];
        const endNode = grid[endCell[1]][endCell[0]];
        const visitedNodes = dijkstras(grid, startNode, endNode);
        const pathArr = getPath(endNode);
        setPathErr(false);
        animateVisited(visitedNodes, pathArr);
        setPlaying(true);
        setHidePath(false);
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
                cell.isSlow = false;
                cell.speedMultiplier = 1;
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
            tool={tool}
            setTool={setTool}
            handlePlay={handlePlay}
            handleClear={handleClear}
            editName={editName}
            setEditName={setEditName}
            pathErr={pathErr}
            setPathErr={setPathErr}
            tutorial={tutorial}
            setTutorial={setTutorial}
        />
        <div className={classes.gridContainer} style={{cursor:(playing?'not-allowed':tool?'pointer':'')}}>
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
                            hidePath={hidePath}
                            setHidePath={setHidePath}
                            tool={tool}
                            playing={playing}
                            curMap={curMap}
                            row={node.row}
                            col={node.col}
                            isStart={node.isStart}
                            isEnd={node.isEnd}
                            isWall={node.isWall}
                            isSlow={node.isSlow}
                            slowCellSpeed={slowCellSpeed}
                        />
                    ))}
                </div>
            ))}
        </div>
        <section className={classes.infoContainer}>
            <div className={classes.infoLeftContainer}>
                <div className={classes.infoCard}>
                    <div className={classes.infoCardColorBack}>
                        <div className={classes.infoCardColor} style={{backgroundColor:'#70FF98'}}></div>
                    </div>
                    <span className={classes.infoTitle}>Starting cell - (Required)</span>
                    <span className={classes.info}>Serves as the starting point for your path.</span>
                </div>
                <div className={classes.infoCard}>
                    <div className={classes.infoCardColorBack}>
                        <div className={classes.infoCardColor} style={{backgroundColor:'#FF6C6C'}}></div>
                    </div>
                    <span className={classes.infoTitle}>Ending cell - (Required)</span>
                    <span className={classes.info}>Serves as the ending point for your path.</span>
                </div>
                <div className={classes.infoCard}>
                    <div className={classes.infoCardColorBack}>
                        <div className={classes.infoCardColor} style={{backgroundColor:'#989898'}}></div>
                    </div>
                    <span className={classes.infoTitle}>Wall cell - (Optional)</span>
                    <span className={classes.info}>Acts as an obstacle for your path to avoid.</span>
                </div>
            </div>
            <div className={classes.infoRightContainer}>
                <div className={classes.infoCard}>
                    <div className={classes.infoCardColorBack}>
                        <div className={classes.infoCardColor} style={{backgroundColor:'#fac26e'}}></div>
                    </div>
                    <span className={classes.infoTitle}>Slow cell - (Optional)</span>
                    <span className={classes.info}>A weighted cell that slows down your path.</span>
                </div>
                <div className={classes.infoCard}>
                    <div className={classes.infoCardColorBack}>
                        <img className={classes.rightclick} src='/static/right-click.svg' alt='right-click' width={'20px'}/>
                    </div>
                    <span className={classes.infoTitle}>Right Click - Eraser</span>
                    <span className={classes.info}>Remove a wall or slow cell.</span>
                </div>
            </div>
        </section>
        </div>
    );
}

export default Map;
