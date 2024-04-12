const mongoose = require("mongoose")
const Sensor = require("../models/sensor")
const Response = require("../utils/response")

const updateSensorData = async (req, res) => {
    try {
        const {onFire} = req.body;
        const sensor = await Sensor.findByIdAndUpdate(req.params.id, {onFire}, {new:true});
        Response.sendSuccessMessage(res, "Sensor status updated successfully", sensor);
    } catch(error) {
        Response.sendErrorMessage(res, 400, error);
    }
}

const createSensor = async (req, res) => {
    console.log(req.body)
    if(!req.body || !req.body.building_id|| req.body.onFire==null || !req.body.lat || !req.body.long) {
        Response.sendErrorMessage(res, 400, "Missing parameters");
        return;
    }
    const location = {type: "Point", coordinates: [req.body.long, req.body.lat]};
    const sensor = await Sensor.create({
        building_d: req.body.building_d,
        onFire: req.body.onFire,
        coordinates: location
    });
    Response.sendSuccessMessage(res, "Sensor created successfully", sensor); 
}
module.exports = {updateSensorData, createSensor}