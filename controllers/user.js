const User = require("../models/user") 
const Response = require("../utils/response")

const registerUser = async (req, res) => {
    console.log(req.body)
    if(req.body==null || req.body.name==null || req.body.age==null || req.body.gender==null || req.body.medRecord==null || req.body.fcmKey==null || req.body.city==null || req.body.phone==null || req.body.fuid==null){
        Response.sendErrorMessage(res, 400, "Missing parameters")
        return
    }
    try {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            medRecord: req.body.medRecord,
            fcmKey: req.body.fcmKey,
            city: req.body.city,
            phone: req.body.phone,
            fuid: req.body.fuid
        })
        Response.sendSuccessMessage(res, "User registered successfully", user)
    } catch (error) {
        if(error.code==11000){
            Response.sendErrorMessage(res, 400, "Phone number already exists")
        }
    }
}

const findUsersInCity = async (req, res) => {
    if(req.query.city==null){
        Response.sendErrorMessage(res, 400, "Missing parameters")
        return
    }
    const users = await User.find({
        city: req.query.city
    }).select('fcmKey')
    Response.sendSuccessMessage(res, "Users found", users)
}

const updateFcmKey = async(req, res) => {
    if(req.body==null ||req.body.fuid==null || req.body.fcmKey==null){
        Response.sendErrorMessage(res, 400, "Missing parameters")
        return
    }
    const {fuid,fcmKey} =req.body
    try {
        const user = await User.findOneAndUpdate({ fuid }, { fcmKey }, { new: true })
        Response.sendSuccessMessage(res, "Fcm key updated successfully", user)
    } catch (error) {
        Response.sendErrorMessage(res, 400, "User not found")
    }
}

module.exports = {registerUser,findUsersInCity,updateFcmKey}