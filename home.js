const express = require('express')
const mongo = require('mongoose')
const app = express();
const getrouter = require('./get')
const CreatePost=require('./Post/createpost')
const createuser=require('./createuser')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;
mongo.connect('mongodb+srv://satyapalmechworld:axN0ykTi1TcZ18ED@cluster0.qkhyapj.mongodb.net/InstaAssignment?retryWrites=true&w=majority')
    .then(() => {
        console.log("connected to DB sucessfully");
    })



app.use('/get', getrouter)
app.use('/createuser',createuser)
app.use('/createpost',CreatePost)

app.listen(port, () => {
    console.log("Server Is listening " + port)
})
