const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const placesRoute = require("./routes/placesRoute");
const userRoute = require("./routes/usersRoute");
const HttpError = require("./models/httpError");

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use('/upload/images',express.static(path.join('upload', 'images')))

// cors handle manually
// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin",'*');
//   res.setHeader("Access-Control-Allow-Headers",'Origin, X-Requested-With, Content-Type,Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Method','GET, POST ,PATCH, DELETE');

//   next();
// })

app.use("/api/places", placesRoute);
app.use("/api/users", userRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});
app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path,(err)=>{
      console.log(err);
    });
  }
  if (res.headerSend) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
const MONGO_URL = 'mongodb+srv://placesShare:placesShare@cluster0.ev8mu.mongodb.net/placesShare?retryWrites=true&w=majority';
mongoose
.connect(MONGO_URL)
.then(()=>{
    app.listen(5000, () => {
        console.log("Server is runing");
      });
}).catch(err=>{
    console.log(err)
});


