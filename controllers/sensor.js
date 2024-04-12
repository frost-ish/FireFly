const mongoose = require("mongoose")
const Sensor = require("../models/sensor")
const Response = require("../utils/response")
const Building = require("../models/building")
const User = require("../models/user")
const Event = require("./event")

const updateSensorData = async (req, res) => {
    try {
        const {onFire, id} = req.body;
        if(!onFire) {
            Response.sendSuccessMessage(res, "Sensor status updated successfully");
            return;
        }
        const sensor = await Sensor.findById(id);
        const building = await Building.findById(sensor.building_id);
        const fire = building.fire;
        let isOnFire = false;
        for(let i=0; i<fire.length; i++) {
            for(let j=0; j<fire[i].length; j++) {
                if(fire[i][j]==1) {
                    isOnFire = true;
                    break;
                }
            }
        }

        if(!isOnFire) {
            // New fire in the building
            const event = await Event.createEventInternal(sensor.building_id, true, true);
        } else {
            // Existing fire spreading
        }



        // const sensor = await Sensor.findByIdAndUpdate(req.body.id, {onFire}, {new:true});
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

const isOnFire = async (sensor_id) => {
    const sensor = await Sensor.findById(sensor_id);
    const building = await Building.findById(sensor.building_id);
    const fire = building.fire;
    for(let i=0; i<fire.length; i++) {
        for(let j=0; j<fire[i].length; j++) {
            if(fire[i][j]==1 && sensor.x==i && sensor.y==j) {
                return true;
            }
        }
    }
}