const express = require('express');
const getrouter = express.Router();
const authorization =require('./Auth/authorization')
const post =require('./Schema/post')

getrouter.get('/',authorization, (req, res) => {
    console.log( req.id)
    res.send("congratulation you are on get page")
    res.end()
})

getrouter.get('/getpost',authorization,(req,res)=>{
    
    
})


module.exports = getrouter;




