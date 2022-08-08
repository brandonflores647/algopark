export const dijkstras = (grid, start, end) => {
    const visitedNodes = [];
    start.distance = 0;
    let unvisitedNodes = getAllNodes(grid);
    while (unvisitedNodes.length) {
        unvisitedNodes = unvisitedNodes.sort((a, b) => a.distance-b.distance);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;

        // handle trapped edgecase
        if (closestNode.distance === Infinity) return visitedNodes;

        closestNode.isVisited = true;
        visitedNodes.push(closestNode);

        if (closestNode === end) return visitedNodes;

        updateUnvisited(closestNode, grid);
    }
}

const getAllNodes = (grid) => {
    const nodes = [];
    for (let row of grid) {
        for (let node of row) {
            nodes.push(node)
        }
    }
    return nodes;
}

const updateUnvisited = (node, grid) => {
    let neighbors = [];
    const {col, row} = node;

    // grab all neighbors
    if (row > 0) neighbors.push(grid[row-1][col]);
    if (row < grid.length-1) neighbors.push(grid[row+1][col]);
    if (col > 0) neighbors.push(grid[row][col-1]);
    if (col < grid[0].length-1) neighbors.push(grid[row][col+1]);
    neighbors = neighbors.filter(ele => !ele.isVisited);

    for (let i of neighbors) {
        i.distance = node.distance + node.speedMultiplier;
        i.previous = node;
    }
}

export const getPath = (endNode) => {
    const pathArr = [];
    let curNode = endNode;
    while (curNode.previous) {
        pathArr.unshift(curNode);
        curNode = curNode.previous;
    }
    return pathArr;
}
