const mongoose = require('mongoose');

const nwpost = mongoose.Schema({
    name: { type: String, required: true },
    topic: { type: String, required: true },
    author:{type:mongoose.Schema.Types.ObjectId , ref:'User', required:true}
    //publisher: { type: mongoose.Schema.Types.ObjectId, required: true }
})


module.exports = mongoose.model('InstaPost', nwpost)