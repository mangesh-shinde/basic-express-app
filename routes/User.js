const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user")
const userController = require("../controllers/UserController")

router.get('/', userController.getUser)

router.post('/', userController.addUser)

router.put('/', async(req, res) => {
    let userDetails = req.body
    const user = await User.findOne({"name" : userDetails.name})
    console.log(user)
    if(user){
        console.log(user)
        if(userDetails.age){
            user.age = userDetails.age
        }

        if(userDetails.email){
            user.email = userDetails.email
        }

        if(userDetails.hobbies){
            for(hobby of userDetails.hobbies){
                user.hobbies.push(hobby) 
            }
             
        }
        
        await user.save()
        console.log("User updated")
        res.send("User updated")
    }
} )

router.patch('/', async(req, res) => {
    let userDetails = req.body
    if(userDetails){
        const user = await User.findOne({"name" : userDetails.name})
        if(user){
            user.bestFriend = userDetails.bestFriend
            await user.save()
            res.status(200).send("User details updated")
        }
    }else{
        res.status(404).send("User not found")
    }
})

router.delete('/', async(req, res) => {
    let userDetails = req.body
    const user = await User.deleteOne({"name" : userDetails.name})
    res.status(200).send(user)
})

module.exports = router