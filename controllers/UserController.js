const { Error } = require("mongoose")
const User = require("../models/user")

const index = {
    async getUser(req, res){
            let username = req.query.name
        
            if(username){
                let user = await User.find({name : username})
                res.json({"name" : user[0].name, "age": user[0].age })
            }else{
                let user = await User.find().populate("bestFriend")
                console.log(user)
                if(user.length){
                    res.json({"users" : user})
                }
                else{
                    res.send("No user found in db")
                }
                
            }
    
            },

    async addUser(req, res){
                let userDetails = req.body 
                const user = new User(userDetails)
                try{
                    await user.save()
                    console.log("user added to db")
                }catch(e){
                    console.log(e.message)
                }
                
                res.status(201).json({user})
                
            }
}
module.exports = index