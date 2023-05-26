const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Createrouter = express.Router();
const createSchema = require('./Schema/create')


Createrouter.get('/', (req, res) => {
    res.send("you are on Create User Page")
})


Createrouter.post('/register', (req, res) => {
    const createuser = req.body;
    bcrypt.hash(createuser.password, 10).then((encryptedpassword) => {
        const user = new createSchema({
            email: createuser.email,
            name: createuser.name,
            password: encryptedpassword
        })
        user.save().then((data) => {
            res.status(200).json({
                message: "data saved sucessfully",
                record: data
            })
        }).catch((err) => {
            res.status(408).json("something went wrong")
        })
    })
        .catch(err => {
            res.status(500).json("failed to decrypt")
        })

    console.log("posted Sucessfully")

})

Createrouter.get('/login', (req, res) => {
    const userdata = req.body;
    console.log("Reached to login page")
    createSchema.findOne({ email: userdata.email }).then((user) => {
        if (user) {
            console.log("mail matched")
            return bcrypt.compare(userdata.password, user.password).then((response) => {
                if (response) {
                    console.log("password matched")
                    jwt.sign({
                        email: user.email,
                        id: user._id,
                    }, "master done",
                        {
                            expiresIn: "1h"
                        }, (err, token) => {
                            if (err) {

                                res.send(err)
                            } else {

                                res.send(
                                    token)
                            }
                        })

                    // res.send("authantication is sucessful")
                } else {
                    res.json("auth failed")
                }

            })

        } else {
            res.send("auth Failed")
        }
    })
        .catch(err => {
            res.send(err)
        })
})


module.exports = Createrouter;