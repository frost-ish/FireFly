const { query } = require("express");
const Response = require("../utils/response");
const { get } = require("mongoose");
const graph = [[0,0.05693286000540852,0,0.0776819532735112,0,0,0.07608536487295696,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0.05693286000540852,0,0.025142903971407466,0.12785225280170873,0,0,0,0,0,0,0.11066488688852917,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0.025142903971407466,0,0,0,0,0,0,0,0.022822286329940787,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0.0776819532735112,0.12785225280170873,0,0,0.07991395819666762,0.04775175149011399,0.03248521852044598,0,0,0,0,0,0.08603937084880617,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0.07991395819666762,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0.04775175149011399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0.07608536487295696,0,0,0.03248521852044598,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0.07997060427824523,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0.07997060427824523,0,0.086487248239317,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0.022822286329940787,0,0,0,0,0,0,0,0,0,0,0,0.03452084542539526,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0.11066488688852917,0,0,0,0,0,0,0,0,0,0,0.10392362014479024,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.026869311908129873,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0.08603937084880617,0,0,0,0,0,0,0.10392362014479024,0,0,0.08053371275464222,0,0,0,0,0,0,0.05814338451245743,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0.08053371275464222,0,0,0,0,0,0,0,0,0.05442041340200584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0.03452084542539526,0,0,0,0,0,0.03043800201657142,0,0.05804170171881258,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.03043800201657142,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05317065622367683,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0.026869311908129873,0,0,0.05804170171881258,0,0,0,0,0,0,0,0,0,0,0,0.08354448753034426,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.06858825308526172,0,0,0,0,0,0.01375039570937534,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.06858825308526172,0,0,0,0,0,0.05970643007522611,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0.05814338451245743,0,0,0,0,0,0,0,0,0.08065184459253188,0.0789577582330562,0,0,0,0,0,0,0,0,0.09146744530104968,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0.05442041340200584,0,0,0,0,0,0,0.08065184459253188,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.0789577582330562,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.04168591994462361,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05970643007522611,0,0,0,0.04168591994462361,0,0,0,0,0,0,0.03333425919167829,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.01375039570937534,0,0,0,0,0,0,0,0,0,0.03465203050895777,0.0811126219784807,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.08354448753034426,0,0,0,0,0,0,0,0,0,0.004724423819995656,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.004724423819995656,0,0.01328278648611966,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.03465203050895777,0,0.01328278648611966,0,0.10807307943247049,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.0811126219784807,0,0,0.10807307943247049,0,0,0,0,0,0,0.0561268595735138,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.03333425919167829,0,0,0,0,0,0,0,0,0,0.06834940937488033,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.09146744530104968,0,0,0,0,0,0,0,0,0,0,0,0.074454402533924,0.05194537757526747,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.074454402533924,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05194537757526747,0,0,0,0,0,0,0,0.05770082004184788,0,0,0,0,0.13945571074498195],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.06834940937488033,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.04446135592391096,0,0,0,0,0,0,0,0,0,0,0,0.05305349961110399,0.05664158032939738,0.14212531619684105,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05305349961110399,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05664158032939738,0,0,0.08980505818910446,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.14212531619684105,0,0.08980505818910446,0,0.0811365237321262,0,0,0.09907853352820008,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05770082004184788,0,0,0,0,0.0811365237321262,0,0.10644841378750491,0.05628944827753852,0,0,0.08656821689276466],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.10644841378750491,0,0.054804119022175135,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05628944827753852,0.054804119022175135,0,0.03928608828348667,0.06446519061413865,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.09907853352820008,0,0,0.03928608828348667,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.06446519061413865,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.13945571074498195,0,0,0,0,0,0.08656821689276466,0,0,0,0,0]];

const goalNodes = [1,16,37,44 ]; // Goal node IDs
const fireNodes = [44, 37]; // Nodes that are on fire
const medKit = [21,7,43]
class Node {
    constructor(id, g) {
        this.id = id; // Node ID
        this.g = g; // Cost from start node to this node
    }
}

const NodeMap = {
    1:"Entrance",
    16:"Fire Exit 1",
    37:"Fire Exit 2",
    44:"Fire Exit 3"
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(node, priority) {
        this.queue.push({ node, priority });
        this.sort();
    }
    dequeue() {
        return this.queue.shift().node;
    }
    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }
    isEmpty() {
        return this.queue.length === 0;
    }
}

function UniformCostSearch(graph, start, goals, fireNodes) {
    const n = graph.length; // Number of nodes in the graph
    // Priority queue to store nodes based on their g values
    const pq = new PriorityQueue();
    // Map to store parent nodes for backtracking the path
    const parent = {};
    // Map to store the cost from start node to each node
    const gValues = {};
    // Initialize g values
    for (let i = 0; i < n; ++i) {
        gValues[i] = Infinity;
    }
    // Start node initialization
    gValues[start] = 0;
    const startNode = new Node(start, 0);
    pq.enqueue(startNode, startNode.g);

    // Least cost path found so far among all the goals
    let leastCostPath = null;

    // Uniform cost search algorithm
    while (!pq.isEmpty()) {
        const current = pq.dequeue();
        const currentID = current.id;
        // Check if the current node is one of the goals
        if (goals.includes(currentID)) {
            // Reconstruct the path from start to goal
            const path = [];
            let currentGoal = currentID;
            while (currentGoal !== start) {
                path.push(currentGoal);
                currentGoal = parent[currentGoal];
            }
            path.push(start);
            path.reverse();

            // Update least cost path if needed
            if (!leastCostPath || computePathCost(path) < computePathCost(leastCostPath)) {
                leastCostPath = path;
            }
        }
        // Explore neighbors of the current node
        for (let i = 0; i < n; ++i) {
            if (graph[currentID][i] != 0 && !fireNodes.includes(i)) {
                const neighborID = i;
                const edgeCost = graph[currentID][i];
                const tentative_g = gValues[currentID] + edgeCost;

                // Update if this path is better than the previous one
                if (tentative_g < gValues[neighborID]) {
                    gValues[neighborID] = tentative_g;
                    parent[neighborID] = currentID;
                    const neighbor = new Node(neighborID, tentative_g);
                    pq.enqueue(neighbor, neighbor.g);
                }
            }
        }
    }

    // Return the least cost path found among all the goals
    return leastCostPath || [];
}
function computePathCost(path) {
    let cost = 0;
    for (let i = 1; i < path.length; i++) {
        // Assuming uniform edge costs
        cost += graph[i][i-1]; // Replace with actual edge costs if available
    }
    return cost;
}
const coordinates = [
    [77.19033215303489, 28.62991963193241],
    [77.19080871663135, 28.629075317523174],
    [77.19099694483236, 28.62851017835102],
    [77.18965891387484, 28.629078191664973],
    [77.18894572373267, 28.6294781782465],
    [77.18926305497138, 28.629829027574374],
    [77.18965609270361, 28.630395740885618],
    [77.19257330515802, 28.627642936743797],
    [77.19185411273611, 28.627639108336567],
    [77.19107632371816, 28.627656441142193],
    [77.18984574570857, 28.627941650915815],
    [77.19065940019436, 28.627046415074645],
    [77.18891239530558, 28.62816020401526],
    [77.18819628624664, 28.628648757368964],
    [77.19135841374731, 28.62707168139788],
    [77.19163029609393, 28.626928247818157],
    [77.19132740237535, 28.626033260384233],
    [77.19085691826047, 28.626418546213785],
    [77.1899212679017, 28.62661996946568],
    [77.1893086813111, 28.626945685722788],
    [77.18840613233999, 28.627570165672736],
    [77.18770855129804, 28.62846606886447],
    [77.18769611922397, 28.62761546737562],
    [77.18842314418993, 28.62674090998459],
    [77.18878804584932, 28.626353239014293],
    [77.18984381070277, 28.62618520488607],
    [77.19015906027823, 28.62516293394404],
    [77.19020025788979, 28.625116068901633],
    [77.19011520373107, 28.625494375256466],
    [77.18914487288424, 28.625243450951075],
    [77.1884995573107, 28.625985653493174],
    [77.18761288237397, 28.62658833988442],
    [77.18694335249205, 28.62662691413456],
    [77.18716049754931, 28.626062802422197],
    [77.18789178093851, 28.625571344137228],
    [77.18865765149428, 28.62464858008235],
    [77.18912893756294, 28.624313075880735],
    [77.18816513668338, 28.62406219636503],
    [77.18738107481119, 28.62493571932967],
    [77.18666011982504, 28.6254429641957],
    [77.18570356273199, 28.62561452919688],
    [77.18616919470855, 28.624886065555643],
    [77.18650024044507, 28.624329516654385],
    [77.18560909912827, 28.624211216074045],
    [77.18590794404196, 28.626348523542447]
];

function findCoordinateIndex(lat, long) {
    for (let i = 0; i<coordinates.length; i++) {
      if (coordinates[i][0] == lat && coordinates[i][1] == long) {
        return i;
      }
    }
    return -1; // Not found
  }
  
// api get definition
const getLatLong = async (req, res) => {
    if (!req.query || !req.query.lat || !req.query.long) {
        Response.sendErrorMessage(res, 400, "Missing parameters")
        return
    }
    var start_id = findCoordinateIndex(req.query.lat, req.query.long)
    const path = await UniformCostSearch(graph, start_id, goalNodes, fireNodes);
    const ret = [[]]
    if(path.length == 0){
        Response.sendErrorMessage(res, 400, "No path found")
        return
    }
    for (let i = 0; i<path.length; i++) {
        ret.push([coordinates[path[i]][0], coordinates[path[i]][1]])
    }   
    
    Response.sendSuccessMessage(res, "Path found", {
        path: ret,
        dis: parseInt(computePathCost(path)*1000),
        time: parseInt(computePathCost(path) / 0.05693286000540852),
        goalName: NodeMap[path[path.length-1]]
    })
}

const getFireNodes = async (req, res) => {
    const ret = []
    for (let i = 0; i<fireNodes.length; i++) {
        ret.push([coordinates[fireNodes[i]][0], coordinates[fireNodes[i]][1]])
    }
    Response.sendSuccessMessage(res, "Fire nodes", ret)
}

const getMedKit = async (req, res) => {
    if (!req.query || !req.query.lat || !req.query.long) {
        Response.sendErrorMessage(res, 400, "Missing parameters")
        return
    }
    var start_id = findCoordinateIndex(req.query.lat, req.query.long)
    const path = await UniformCostSearch(graph, start_id, medKit, fireNodes);
    const ret = [[]]
    if(path.length == 0){
        Response.sendErrorMessage(res, 400, "No path found")
        return
    }
    for (let i = 0; i<path.length; i++) {
        ret.push([coordinates[path[i]][0], coordinates[path[i]][1]])
    }   
    
    Response.sendSuccessMessage(res, "Path found", {
        path: ret,
        dis: parseInt(computePathCost(path)*1000),
        time: parseInt(computePathCost(path) / 0.05693286000540852)
    })
}

module.exports = { getLatLong, getFireNodes, getMedKit}