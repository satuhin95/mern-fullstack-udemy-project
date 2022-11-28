const express = require('express');
const bodyParser = require('body-parser');

const placesRoute = require('./routes/placesRoute');
const HttpError = require('./models/httpError');

const app = express();
app.use(bodyParser.json())
app.use('/api/places',placesRoute);

app.use((req,res,next)=>{
    const error = new HttpError("Could not find this route.", 404);
    throw error;
})
app.use((error,req,res,next)=>{
    if (res.headerSend) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'An unknown error occurred!'})
})


app.listen(5000,()=>{
    console.log('Server is runing');
})