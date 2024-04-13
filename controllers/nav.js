const mongoose = require("mongoose");
const Building = require("../models/building");
const Response = require("../utils/response");

const coordinates = {
    "3 0":"77.18556315921688,28.624211110729064",
    "3 1":"77.1858402008753,28.624575834283945",
    "3 2":"77.18609833293488,28.62492572463931",
    "3 3":"77.18633689271303,28.625217541152722",
    "3 4":"77.18652913663016,28.62548036372624",
    "3 5":"77.1866817184823,28.625679058835132",
    "3 6":"77.18808444587967,28.623919936863828",
    "2 6":"77.18649614979381,28.625966455141977",
    "1 6":"77.18617795049335,28.62615480668582",
    "0 6":"77.18595579555301,28.62631074601461",
    "4 5":"77.1867894956078,28.625281068446697",
    "5 5":"77.18702904039617,28.625145082549707",
    "6 5":"77.18737315982241,28.62491711975656",
    "7 5":"77.18768464576732,28.624711217432747",
    "8 5":"77.18792475683966,28.6245517469888",
    "9 5":"77.1881914864174,28.62441110552041",
    "9 4":"77.18811617593661,28.624158110788414"
}

const getLatLng = async (req, res) => {
    if(req.query.uuid == null) {
        Response.sendErrorMessage(res, 400, "Missing parameters");
        return;
    }

    const sensor = await Sensor.findOne({uuid: req.query.uuid});
    
    const entry = coordinates[sensor.x + " " + sensor.y];
    Response.sendSuccessMessage(res, "Coordinates found",s {lat: entry.split(",")[1], lng: entry.split(",")[0]});
}

const navigateToFireExit = async (req, res) => {
    if(req.query == null || req.query.x == null || req.query.y == null) {
        Response.sendErrorMessage(res, 400, "Missing parameters");
        return;
    }

    const building_id = "66194a5983fa9e2aa31f8c90";
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


    const [time, goalX, goalY] = bfs(map, visited, fire, parseInt(req.query.x), parseInt(req.query.y), goalNodes, parentX, parentY);
    const path = printPath(parentX, parentY, goalX, goalY);
    if(path) {
        Response.sendSuccessMessage(res, "Path found", {
        time: time, 
        path: path
    });
    }
    else {
        Response.sendErrorMessage(res, 404, "No path found");
    }
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

const ttiMatrix = 
[
    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250],
    [200, 300, 400, 500, 600, 700, 800, 900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200],
    [300, 400, 500, 600, 700, 800, 900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150],
    [400, 500, 600, 700, 800, 900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100],
    [500, 600, 700, 800, 900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50],
    [600, 700, 800, 900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30],
    [700, 800, 900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30, 20],
    [800, 900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30, 20, 50],
    [900, 1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30, 20, 50, 100],
    [1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30, 20, 50, 100, 150],
    [950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30, 20, 50, 100, 150, 200],
    [900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30, 20, 50, 100, 150, 200, 250],
    [850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30, 20, 50, 100, 150, 200, 250, 300],
    [800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 30, 20, 50, 100, 150, 200, 250, 300, 350]
  ]

function simulateFireSpread(map, fire, time, ttiMatrix) {
    const directions = [
        { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
        { dx: 0, dy: -1 }, { dx: 0, dy: 1 }
    ];
    const calculateSpreadProbability = (tti) => {
        return Math.max(0.01, Math.min(1.0, 1 / tti));
    };
    let t = 0;
        while (t<time) {
            let avg_tti = 0;
            let steps = 0;
            const newFire = fire.map(row => [...row]);
            for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[0].length; y++) {
                if (fire[x][y]) { // Already on fire
                continue;
                }
                let fireNearby = directions.some(({dx, dy}) => {
                const nx = x + dx, ny = y + dy;
                return nx >= 0 && nx < map.length && ny >= 0 && ny < map[0].length && fire[nx][ny];
                });
                if (fireNearby) {
                let spreadProbability = calculateSpreadProbability(ttiMatrix[x][y]);
                avg_tti += spreadProbability;
                steps += 1;
                if (Math.random() < spreadProbability) {
                    newFire[x][y] = true;
                }
                }
            }
            }
            fire = newFire;
            t += avg_tti/steps;
        }
    return fire;
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
      fire = simulateFireSpread(map, fire, 1, ttiMatrix);
    }
    return [time, goalX, goalY];
}

function printPath(parentX, parentY, x, y) {
    if(x==null||y==null) {
        console.log("No path found");
      return;
    }
    if (parentX[x][y] === -1 && parentY[x][y] === -1) {
      console.log("No path found");
      return;
    }
  
    const path = [];
    while (x !== -1 && y !== -1) {
      const str = x + " " + y;
      const latlng = coordinates[str];
      path.push([latlng.split(",")[1], latlng.split(",")[0]]);
      const tempX = parentX[x][y];
      const tempY = parentY[x][y];
      x = tempX;
      y = tempY;
    }

    return path.reverse();
  }
  

module.exports = {navigateToFireExit, getLatLng};