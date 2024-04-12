const mongoose = require("mongoose")

const sensorSchema = new mongoose.Schema({
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building"
    },
    onFire: Boolean,
    x : Number,
    y : Number
});

const sensor = mongoose.model("Sensor", sensorSchema);
module.exports = sensor;