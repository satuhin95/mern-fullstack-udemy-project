const HttpError = require("../models/httpError");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

const getPlaceById = async(req, res, next) => {
  const placeId = req.params.pId;
  let place;
  try {
     place = await Place.findById(placeId)
     if(place){
      res.json({ place:place.toObject({getters:true}) });
     }else{
      const err= new HttpError("Could not find a place for the provided id", 500);
       return next(err);
     }
  } catch (error) {
    const err= new HttpError("Could not find a place for the provided id", 500);
   return next(err);
  }
  
  // res.json({ place });
  // res.json({ place:place.toObject({getters:true}) });
};

const getPlacesByUserId = async(req, res, next) => {
  const userId = req.params.uId;
  let places;
  try {
    places = await Place.find({creator:userId})
    if(places){
      res.json({ places :places.map(place =>place.toObject({getters:true})) });
     }else{
      const err= new HttpError("Could not find a place for the provided id", 500);
      return next(err);
     
     }
 } catch (error) {
   const err= new HttpError("Could not find a place for the provided id", 500);
  return next(err);
 }

};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs data", 422);
  }
  const { title, description, address, creator } = req.body;
  const coordinates = getCoordsForAddress(address);
  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    image: "https://pbs.twimg.com/media/E69JsVhVkAA2rSa?format=jpg&name=large",
    address,
    creator,
  });
  try {
   const result =  await createdPlace.save();
   if (result) {
      res.status(201).json({message:"Data Create Successfully"})
   }
  } catch (error) {
    const err = new HttpError("Creating place failed, place try again");
    return next(err);
  }
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs data", 422);
  }
  const placeId = req.params.pId;
  const { title, description } = req.body;

  try {
    let place = await Place.findById(placeId)
     if(place){
      place.title = title;
      place.description = description;
      try {
       const result = await place.save();
        if (result) {
          res.status(201).json({place:result.toObject({getters:true})})
       }
      } catch (error) {
        const err= new HttpError("Could not update data", 500);
        return next(err);
      }
     }else{
      const err= new HttpError("Could not find a place for the provided id", 500);
       return next(err);
     }
  } catch (error) {
    const err= new HttpError("Could not find a place for the provided id", 500);
   return next(err);
  }

  

};
const deletePlace =async (req, res, next) => {
  const placeId = req.params.pId;
  let place;
 try {
  place = await Place.findById(placeId)
    try {
     await place.remove()
     res.status(200).json({ message: "Deleted Place" });
    } catch (error) {
      const err = new HttpError("Something wrong");
       return next(err);
    }
 } catch (error) {
  const err = new HttpError("Something wrong");
    return next(err);
 }
  
};
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
