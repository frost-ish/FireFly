const router = require("express").Router()
//building_id, lat, long
const NavController = require("../controllers/nav");

router.get("/", NavController.navigateToFireExit);
router.get("/getCoord", NavController.getLatLng);

module.exports = router;