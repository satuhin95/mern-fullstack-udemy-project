const HttpError = require("../models/httpError");
 const { v4: uuidv4 }  = require('uuid')
let DUMMY_DATA = [
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

  const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uId;
    const places = DUMMY_DATA.filter((item) => item.creator === userId);
    if (!places) {
      return next(new HttpError("Could not find a place for the provided id", 404))
    }
    res.json({ places });
  }

  const createPlace = (req,res,next)=>{
    const {title,description, coordinates, address,creator} = req.body;
    const createdPlace ={
        id:uuidv4(),
        title,
        description,
        location:coordinates,
        address,
        creator
    };
    DUMMY_DATA.push(createdPlace)
    res.status(201).json({place:DUMMY_DATA})
  }

  const updatePlace = (req,res,next)=>{
    const placeId = req.params.pId;
    const {title,description} = req.body;
    const updatePlace = {...DUMMY_DATA.find((item) => item.id === placeId)};
    const placeIndex = DUMMY_DATA.find(item=> item.id === placeId)
    updatePlace.title = title;
    updatePlace.description = description;
    DUMMY_DATA[placeIndex] = updatePlace;
    res.status(200).json({place:updatePlace})
   
  }
  const deletePlace = (req,res,next)=>{
    const placeId = req.params.pId;
    DUMMY_DATA = DUMMY_DATA.filter(item => item.id !==placeId);
    res.status(200).json({message:"Deleted Place"})
  }
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
