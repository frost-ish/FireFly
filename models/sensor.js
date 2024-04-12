const mongoose = require("mongoose")

const sensorSchema = new mongoose.Schema({
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building"
    },
    onfire: Boolean,
    coordinates: {
        type: {
          type: String,
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    x : Number,
    y : Number
});

const sensor = mongoose.model("Sensor", sensorSchema);
module.exports = sensor;