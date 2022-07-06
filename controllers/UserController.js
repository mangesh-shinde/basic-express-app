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
                
            },

            async updateUser(req, res){
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
            },

            async patchUser(req, res){
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
            },

            async deleteUser(req, res){
                let userDetails = req.body
                const user = await User.deleteOne({"name" : userDetails.name})
                res.status(200).send(user)
            }
}
module.exports = index