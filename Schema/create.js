const mongoose = require('mongoose');

const createuser = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports=mongoose.model('User',createuser);