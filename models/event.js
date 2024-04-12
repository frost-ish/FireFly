//event_id, time started, building id, is ongoing

// people stranded UserId, buildingid, has exited, ll refid

const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    event_id : Number,
    building_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Building"
    },
    isOngoing: {type:Boolean,
        default:true
    },
    firefighter: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Firefighter"
    },
})

const Event = mongoose.model("Event", eventSchema)
module.exports = Event