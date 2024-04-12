const PersonStranded = require("../models/person_stranded")
const Response = require("../utils/response")
const mongoose = require("mongoose")

const updatePersonStatus = async (req, res) => {
    if(req.body.isConfirmed == false) {
        const user = await PersonStranded.findOneAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)});
        Response.sendSuccessMessage(res, "Person status updated successfully", user);
        return;
    }
    try {
        const {isConfirmed} = req.body;
        const user = await PersonStranded.findByIdAndUpdate(req.params.id, {isConfirmed}, {new:true});
        if(!user.isConfirmed) {
            Response.sendSuccessMessage(res, "Person status updated successfully", user);
            return;
        }

        const {ll_refid} = req.body;
        user.ll_refid = ll_refid;
        await user.save();
        Response.sendSuccessMessage(res, "Person status updated successfully", user);
    } catch(error) {
        Response.sendErrorMessage(res, 400, error);
    }
}

const getPersonStranded = async (req, res) => {
    //firefighter id->event id->person stranded
    const event = await Event.findOne({firefighter_id: req.params.firefighter_id});
    const personStranded = await PersonStranded.find({event_id: event._id, isConfirmed: true});
    Response.sendSuccessMessage(res, "Person Stranded fetched successfully", personStranded);
}

module.exports = {updatePersonStatus,getPersonStranded}
