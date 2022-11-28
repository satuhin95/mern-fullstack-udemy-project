const express = require('express');
const bodyParser = require('body-parser');

const placesRoute = require('./routes/placesRoute')

const app = express();
app.use('/api/places',placesRoute);

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