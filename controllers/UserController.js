const User = require("../models/user")

const index = {
    async getUser(req, res){
            let username = req.query.name
        
            if(username){
                let user = await User.findOne({name : username})
                //let user = await User.findByName("Mangesh")
                //user.sayHi()
                //user.getAge()
                //user.forEach(u => console.log(u.namedEmail) )
                //console.log(user.namedEmail)

                if(user){
                    res.status(200).json({"users" : user})
                }else{
                    res.status(404).json({"error" : "User not found"})
                }
                
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
                try{
                    const user = new User(userDetails)
                    await user.save()
                    console.log("user added to db")
                    res.status(201).json({user})
                }catch(e){
                    console.log(e.message)
                    res.status(422).json({"error" : e.message})
                }  
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
                try{
                    const user = await User.deleteOne({"name" : userDetails.name})
                    if(user.deletedCount){
                        res.status(200).json({"message" : "User deleted successfully"})
                    }else{
                        res.status(404).json({"message" : "No data found for deletion"})
                    }   
                }catch(e){
                    console.log(e.message)
                    res.status(422).json({"error" : e.message})
                }
            }
}
module.exports = index