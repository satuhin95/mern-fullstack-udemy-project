const express = require("express");
const HttpError = require("../models/httpError");

const router = express.Router();
const DUMMY_DATA = [
  {
    id: "p1",
    title: "Empire state Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "New York,USA",
    location: {
      lat: 40.7484474,
      lng: -74.9871516,
    },
    creator: "u1",
  },
];
router.get("/:pId", (req, res, next) => {
  const placeId = req.params.pId;
  const place = DUMMY_DATA.find((item) => item.id === placeId);
  if (!place) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }
  res.json({ place });
});

router.get("/user/:uId", (req, res, next) => {
  const userId = req.params.uId;
  const place = DUMMY_DATA.find((item) => item.creator === userId);
  if (!place) {
    return next(new HttpError("Could not find a place for the provided id", 404))
  }
  res.json({ place });
});

module.exports = router;
