const mongoose = require("mongoose")

const firefighterSchema = new mongoose.Schema({
    name: String,
    dept: String,
    isActive: Boolean,
    currentEvent: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    fcmKey: String,
    fuid: {
        type:String,
        unique:true,
        index:true
    }
})

const Firefighter = mongoose.model("Firefighter", firefighterSchema)
module.exports = Firefighter