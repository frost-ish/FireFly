const router = require("express").Router()
const BuildingsController = require("../controllers/building")

router.post("/", BuildingsController.createNewBuilding)
router.get("/", BuildingsController.getAllBuildings)
router.get("/:id", BuildingsController.getBuildingDetails)

module.exports = router