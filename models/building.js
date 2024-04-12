const mongoose = require("mongoose")

const buildingSchema = new mongoose.Schema({
    name: String,
    city: String,
    address: String,
    location: {
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
    map: [[[Number]]],
    fire: [[Number]]
})

const Building = mongoose.model("Building", buildingSchema)
module.exports = Building