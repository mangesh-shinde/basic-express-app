const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    age: {
        type : Number,
        min : 1,
        max : 125
    },
    email: {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10
    },
    createdAt : {
        type : Date,
        default : () => Date.now(),
        immuatable : true
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