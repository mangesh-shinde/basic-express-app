const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    createdAt : {
        type : Date,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
    bestFriend: {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    },
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
})

module.exports = mongoose.model('User', UserSchema)