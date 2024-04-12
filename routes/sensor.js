const router = require("express").Router()
const SensorController = require("../controllers/sensor")

router.patch("/:id", SensorController.updateSensorData)
router.post("/", SensorController.createSensor)

module.exports = router