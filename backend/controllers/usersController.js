const { v4: uuidv4 }  = require('uuid');
const HttpError = require('../models/httpError');
const { validationResult } = require("express-validator");
const User = require('../models/user')

const getUsers = async (req,res,next)=>{
    try {
        const users = await User.find({},'-password')
        res.status(200).json({users:users.map(user=> user.toObject({getters :true}))})
    } catch (error) {
        const err = new HttpError('User not found!',500);
       return next(err);
    }

}

const signup = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return next(new HttpError("Invalid inputs data", 422))
    }
    const {name,email,password} = req.body;
   
    try {
        const existingUser = await User.findOne({email:email});
        if(existingUser){
          const err = new HttpError('User already exiets',422);
          return next(err);
        }else{
            const createUser = new User({
                name,
                email,
                image:'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png',
                password,
                places:[]
            })
            try {
                const result = await createUser.save();
                if (result) {
                    res.status(200).json({user:result.toObject({getters:true})})
                }else{
                const err = new HttpError('SignUp faild',500);
                 return next(err);
                }
            } catch (error) {
                const err = new HttpError('SignUp faild',500);
                 return next(err);
            }
            
        }
        

    } catch (error) {
       const err = new HttpError('SignUp failed, please try again later',500);
       return next(err);
    }


   
}

const login = async(req,res,next)=>{
    const {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email:email})
        if (!existingUser || existingUser.password !==password) {
            return next( new HttpError('Could not identify user',401));
        }
        res.status(200).json({ user:existingUser.toObject({getters:true})})
    } catch (error) {
        const err = new HttpError('LogIn failed, please try again later',500);
       return next(err);
    }

}


exports.getUsers = getUsers
exports.signup = signup
exports.login = login