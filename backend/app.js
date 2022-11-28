const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoute = require("./routes/placesRoute");
const userRoute = require("./routes/usersRoute");
const HttpError = require("./models/httpError");

const app = express();
app.use(bodyParser.json());
app.use("/api/places", placesRoute);
app.use("/api/users", userRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});
app.use((error, req, res, next) => {
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


