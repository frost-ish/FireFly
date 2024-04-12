const Building = require("../models/building")
const Response = require("../utils/response")

const createNewBuilding = async (req,res) => {
    if(!req.body || !req.body.name || !req.body.address || !req.body.lat || !req.body.long || !req.body.map || !req.body.fire) {
        Response.sendErrorMessage(res, 400, "Missing parameters")
        return
    }
    try{
        const location = {type: "Point", coordinates: [req.body.long, req.body.lat]}
        const topLeft = {type: "Point", coordinates: [req.body.topLeft[0], req.body.topLeft[1]]}
        const bottomLeft = {type: "Point", coordinates: [req.body.bottomLeft[0], req.body.bottomLeft[1]]}
        const topRight = {type: "Point", coordinates: [req.body.topRight[0], req.body.topRight[1]]}
        const bottomRight = {type: "Point", coordinates: [req.body.bottomRight[0], req.body.bottomRight[1]]}
        const building = await Building.create({
            name: req.body.name,
            address: req.body.address,
            location: location,
            map: req.body.map,
            fire: req.body.fire,
            topLeft: topLeft,
            topRight: topRight,
            bottomLeft: bottomLeft,
            bottomRight: bottomRight
        })
        Response.sendSuccessMessage(res, "Building created successfully", building)
    } catch(error) {
        Response.sendErrorMessage(res, 400, "Error", error)
    }
}

const getAllBuildings = async(req,res) => {
    const buildings = await Building.find()
    Response.sendSuccessMessage(res, "Buildings found", buildings)
}

const getBuildingDetails = async(req,res) => {
    if(!req.query || !req.params.id) {
        Response.sendErrorMessage(res, 400, "Missing parameters")
        return
    }
    const building_id = req.params.id
    const building = await Building.findById(building_id);

    Response.sendSuccessMessage(res,"Building found", building)
}



module.exports = {createNewBuilding, getAllBuildings, getBuildingDetails}