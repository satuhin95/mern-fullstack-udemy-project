const HttpError = require("../models/httpError");

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
const getPlaceById = (req, res, next) => {
    const placeId = req.params.pId;
    const place = DUMMY_DATA.find((item) => item.id === placeId);
    if (!place) {
      throw new HttpError("Could not find a place for the provided id", 404);
    }
    res.json({ place });
  }

  const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uId;
    const place = DUMMY_DATA.find((item) => item.creator === userId);
    if (!place) {
      return next(new HttpError("Could not find a place for the provided id", 404))
    }
    res.json({ place });
  }
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
