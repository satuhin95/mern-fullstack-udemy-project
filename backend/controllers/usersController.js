const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res
      .status(200)
      .json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    const err = new HttpError("User not found!", 500);
    return next(err);
  }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs data", 422));
  }
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const err = new HttpError("User already exiets", 422);
      return next(err);
    } else {
      let hashPassword;
      try {
        hashPassword = await bcrypt.hash(password, 12);
      } catch (err) {
        return next(new HttpError("Could not cteate hash password", 500));
      }
      const createUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashPassword,
        places: [],
      });
      try {
        const result = await createUser.save();
        if (result) {
          let token;
          try {
            token = jwt.sign(
                { userId: result.id, email: result.email },
                "my_secretKey",
                { expiresIn: "1h" }
              );
          } catch (error) {
             const err = new HttpError("SignUp faild", 500);
             return next(err);
          }

          res.status(201).json({ userId: result.id, email:result.email,token:token });
        //   res.status(200).json({ user: result.toObject({ getters: true }) });
        } else {
          const err = new HttpError("SignUp failed", 500);
          return next(err);
        }
      } catch (error) {
        const err = new HttpError("SignUp failed", 500);
        return next(err);
      }
    }
  } catch (error) {
    const err = new HttpError("SignUp failed, please try again later", 500);
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return next(new HttpError("Could not identify user ", 401));
    }
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      return next(new HttpError("Could not identify user ", 401));
    }
    if (!isValidPassword) {
      return next(new HttpError("Could not identify user ", 401));
    }
    let token;
    try {
      token = jwt.sign(
          { userId: existingUser._id, email: existingUser.email },
          "my_secretKey",
          { expiresIn: "1h" }
        );
    } catch (error) {
       const err = new HttpError("login failed", 500);
       return next(err);
    }
    res.status(201).json({ userId: existingUser._id, email:existingUser.email,token:token });
    // res.status(200).json({ user: existingUser});
    // res.status(200).json({ user: existingUser.toObject({ getters: true }) });
  } catch (error) {
    const err = new HttpError("LogIn failed, please try again later", 500);
    return next(err);
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
