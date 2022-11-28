const express = require("express");
const { getPlaceById, getPlaceByUserId } = require("../controllers/placesController");

const router = express.Router();

router.get("/:pId",getPlaceById);

router.get("/user/:uId",getPlaceByUserId );

module.exports = router;
