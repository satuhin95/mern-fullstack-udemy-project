const express = require("express");
const { check } = require("express-validator");
const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placesController");

const router = express.Router();

router.get("/:pId", getPlaceById);

router.get("/user/:uId", getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router.patch(
  "/:pId",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ],
  updatePlace
);

router.delete("/:pId", deletePlace);

module.exports = router;
