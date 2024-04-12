const router = require("express").Router()
//building_id, lat, long
const NavController = require("../controllers/nav");

router.get("/", NavController.navigateToFireExit);

module.exports = router;