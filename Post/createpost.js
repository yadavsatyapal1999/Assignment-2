const express = require('express');
const CreatePost = express.Router();
const authorization = require('../Auth/authorization')
const newpost = require('../Schema/post');


CreatePost.get('/', (req, res) => {
    console.log(req.userId)
    res.send("you are on create post")
})

CreatePost.get('/get', authorization, (req, res) => {
    const body = req.body

    newpost.find(req.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })

})

CreatePost.put('/update/:name', authorization, (req, res) => {
    const name = req.params.name
    const body = req.body;
    newpost.updateOne({ name: name }, body)
        .then(response => {
            if (response.modifiedCount != 0) {
                res.json("Updated Sucessfully")
            } else {
                res.json("unable to update")
            }
        })

});



CreatePost.delete('/delete/:name', authorization, (req, res) => {
    const name = req.params.name;
    newpost.deleteOne({ name: name }).then((response) => {
        res.status(200).json({
            message: "deleted sucessfully",
            data: response
        })
    }).catch(err => {
        res.status(305).json(err)
    })
})

CreatePost.post('/getpost', authorization, (req, res) => {
    const userpost = req.body;

    const postdetail = new newpost({
        name: userpost.name,
        topic: userpost.topic,
        author: req.id,
    })

    postdetail.save().then((record) => {
        res.status(200).json({
            message: "data Saved sucessfully"
        })
    }).catch(err => {
        res.send(err)
    })
})



module.exports = CreatePost;