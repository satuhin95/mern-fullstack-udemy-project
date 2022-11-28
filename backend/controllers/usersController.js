const { v4: uuidv4 }  = require('uuid');
const HttpError = require('../models/httpError');
const { validationResult } = require("express-validator");
let DUMMY_DATA = [
    {
      id: "u1",
      name:"admin",
      email:"admin@gmail.com",
      password:"admin",
     
    },
  ];
const getUsers = (req,res)=>{
    res.json({users:DUMMY_DATA})
}

const signup = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       throw new HttpError("Invalid inputs data", 422)
    }
    const {name,email,password} = req.body;
    const hasUser = DUMMY_DATA.find((u=> u.email === email))
    if(hasUser){
        throw new HttpError('User already exiets',422);
    }
    const newUser ={
        id:uuidv4(),
        name,
        email,
        password
    }
    DUMMY_DATA.push(newUser);
    res.status(201).json(DUMMY_DATA)
}

const login = (req,res,next)=>{
    const {email,password} = req.body;

    const identifyedUser = DUMMY_DATA.find(user=>user.email === email);
    if (!identifyedUser || identifyedUser.password !==password) {
        throw new HttpError('Could not identify user',401);
    }
    res.json({message:"User Logged in!"})
}


exports.getUsers = getUsers
exports.signup = signup
exports.login = login