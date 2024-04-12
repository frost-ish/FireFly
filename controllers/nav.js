const mongoose = require("mongoose");
const Building = require("../models/building");
const Response = require("../utils/response");


const navigateToFireExit = async (req, res) => {
    if(req.query == null || req.query.building_id == null || req.query.lat == null || req.query.long == null) {
        Response.sendErrorMessage(res, 400, "Missing parameters");
        return;
    }

    const {building_id, lat, long} = req.query;
    const building = await Building.findById(building_id);
    if(!building) {
        Response.sendErrorMessage(res, 400, "Building not found");
        return;
    }

    const map = building.map;
    const fire = building.fire;
    const goalNodes = [ [6,23] , [13,21] , [13,22] , [9,4] , [0,6] ]

    const rowCount = map.length;
    const colCount = map[0].length;
    const parentX = [];
    const parentY = [];

    for (let i = 0; i < rowCount; i++) {
    parentX.push(new Array(colCount).fill(-1));
    parentY.push(new Array(colCount).fill(-1));
    }
    const visited = new Array(rowCount).fill(null).map(() => new Array(colCount).fill(false));


    const [time, goalX, goalY] = bfs(map, visited, fire, 3, 0, goalNodes, parentX, parentY);
    const path = printPath(parentX, parentY, goalX, goalY);
    res.send(path);
}

function isValidCell(map, x, y) {
    return x >= 0 && x < map.length && y >= 0 && y < map[0].length && map[x][y][0] === 1;
}

function isNodeSafe(map, fire, x, y, time, spreadRate) {
    if (fire[x][y]==1) return false;
    return true;
}

function is_GoalNode(coordinate, coordinatesArray) {
    for (const coord of coordinatesArray) {
      if (coord[0] === coordinate[0] && coord[1] === coordinate[1]) {
        return true;
      }
    }
    return false;
}

function bfs(map, visited, fire, x1, y1, goalNodes, parentX, parentY) {
    const queue = [];
    queue.push([x1, y1]);
    let time = 0;
    visited[x1][y1] = true;
    let goalX = null;
    let goalY = null;
    while (queue.length > 0) {
      const n = queue.length;
      let found = false;
      for (let i = 0; i < n; i++) {
        const [x, y] = queue.shift();
        console.log("visiting node: "+x+" "+y);
        if (!isNodeSafe(map, fire, x, y, time)) continue;
        if (is_GoalNode([x, y], goalNodes)) {
          found = true;
          goalX = x;
          goalY = y;
          break;
        }
        if (isValidCell(map, x - 1, y) && !visited[x - 1][y]) {
          queue.push([x - 1, y]);
          visited[x - 1][y] = true;
          parentX[x - 1][y] = x;
          parentY[x - 1][y] = y;
        }
        if (isValidCell(map, x + 1, y) && !visited[x + 1][y]) {
          queue.push([x + 1, y]);
          visited[x + 1][y] = true;
          parentX[x + 1][y] = x;
          parentY[x + 1][y] = y;
        }
        if (isValidCell(map, x, y - 1) && !visited[x][y - 1]) {
          queue.push([x, y - 1]);
          visited[x][y - 1] = true;
          parentX[x][y - 1] = x;
          parentY[x][y - 1] = y;
        }
        if (isValidCell(map, x, y + 1) && !visited[x][y + 1]) {
          queue.push([x, y + 1]);
          visited[x][y + 1] = true;
          parentX[x][y + 1] = x;
          parentY[x][y + 1] = y;
        }
      }
      if (found) break;
      time++;
    }
    return [time, goalX, goalY];
}

function printPath(parentX, parentY, x, y) {
    if (parentX[x][y] === -1 && parentY[x][y] === -1) {
      console.log("No path found");
      return;
    }
  
    const path = [];
    while (x !== -1 && y !== -1) {
      path.push({ x, y });
      const tempX = parentX[x][y];
      const tempY = parentY[x][y];
      x = tempX;
      y = tempY;
    }

    return path.reverse();
  }
  

module.exports = {navigateToFireExit};