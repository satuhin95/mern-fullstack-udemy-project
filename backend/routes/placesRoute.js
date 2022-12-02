const express = require("express");
const { check } = require("express-validator");
const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placesController");
const fileUpload = require("../middleware/fileUpload");

const router = express.Router();

router.get("/:pId", getPlaceById);

router.get("/user/:uId", getPlacesByUserId);

router.post(
  "/",
  fileUpload.single('image'),
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
