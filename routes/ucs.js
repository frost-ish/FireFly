const router = require("express").Router()

const UcsController = require("../controllers/ucs")

router.get("/", UcsController.getLatLong)
router.get("/fireNodes/",UcsController.getFireNodes)
router.get("/getMedKit/",UcsController.getMedKit)
module.exports = router