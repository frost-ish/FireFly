const mongoose = require("mongoose")
const Sensor = require("../models/sensor")
const Response = require("../utils/response")

const updateSensorData = async (req, res) => {
    try {
        const {onFire} = req.body;
        if(!onFire) {
            Response.sendSuccessMessage(res, "Sensor status updated successfully");
            return;
        }
        const sensor = await Sensor.findByIdAndUpdate(req.body.id, {onFire}, {new:true});
        Response.sendSuccessMessage(res, "Sensor status updated successfully", sensor);
    } catch(error) {
        Response.sendErrorMessage(res, 400, error);
    }
}

const createSensor = async (req, res) => {
    if(!req.body || !req.body.building_id|| req.body.onFire==null || req.body.x==null || req.body.y==null) {
        Response.sendErrorMessage(res, 400, "Missing parameters");
        return;
    }
    const sensor = await Sensor.create({
        building_id: req.body.building_id,
        onFire: req.body.onFire,
        x: req.body.x,
        y: req.body.y
    });
    Response.sendSuccessMessage(res, "Sensor created successfully", sensor); 
}
module.exports = {updateSensorData, createSensor}