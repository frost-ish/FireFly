const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    medRecord : String,
    fcmKey: String,
    city: String,
    phone: {
        type:String,
        unique:true,
        index:true
    },
    fuid: String
})

const User = mongoose.model("User", userSchema)
module.exports = User