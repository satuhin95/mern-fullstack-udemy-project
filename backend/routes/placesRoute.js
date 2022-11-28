const express = require("express");
const { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace } = require("../controllers/placesController");

const router = express.Router();

router.get("/:pId",getPlaceById);

router.get("/user/:uId",getPlacesByUserId );

router.post('/', createPlace)

router.patch('/:pId',updatePlace)

router.delete('/:pId', deletePlace)

module.exports = router;
