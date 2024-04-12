const router = require("express").Router()
const EventsController = require("../controllers/event")

router.post("/", EventsController.createEvent)

module.exports = router