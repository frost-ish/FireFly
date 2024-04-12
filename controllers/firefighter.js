const Firefighter = require("../models/firefighter")
const Response = require("../utils/response")

const createFirefighter = async (req,res) => {
    if(!req.body || !req.body.name || !req.body.dept || !req.body.isActive || !req.body.currentEvent || !req.body.fcmKey || !req.body.fuid) {
        Response.sendErrorMessage(res, 400, "Missing parameters")
        return
    }
    try{
        const firefighter = await Firefighter.create({
            name: req.body.name,
            dept: req.body.dept,
            isActive: req.body.isActive,
            currentEvent: req.body.currentEvent,
            fuid: req.body.fuid,
            fcmKey: req.body.fcmKey
        })
        Response.sendSuccessMessage(res, "Firefighter created successfully", firefighter)
    } catch(error) {
        Response.sendErrorMessage(res, 400, "Error", error)
    }
}



module.exports = {createFirefighter}