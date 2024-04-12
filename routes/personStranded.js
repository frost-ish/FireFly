const router = require("express").Router()
const PersonStrandedController = require("../controllers/personStranded")

router.patch("/:id", PersonStrandedController.updatePersonStatus)
router.get("/:id", PersonStrandedController.getPersonStranded)

module.exports = router