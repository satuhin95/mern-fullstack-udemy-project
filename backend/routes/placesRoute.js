const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('Get Request in places');
    res.json({message:"It's Works!"})
})

module.exports =router;