const router = require("express").Router()
const UsersController = require("../controllers/user")

router.post("/", UsersController.registerUser)
router.get("/findByCity", UsersController.findUsersInCity)
router.patch("/updateFcmKey", UsersController.updateFcmKey)

module.exports = router