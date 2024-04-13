const mongoose = require("mongoose")

const personStrandedSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User"
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Building"
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Event"
    },
    hasExited: Boolean,
    ll_refid: String,
    isConfirmed: {
        type: Boolean,
        default: false
    }
})

const PersonStranded = mongoose.model("PersonStranded", personStrandedSchema)

module.exports = PersonStranded