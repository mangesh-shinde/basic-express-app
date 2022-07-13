const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    age: {
        type : Number,
        min : 1,
        max : 125,
        validate: [{
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        },
        {
            validator: v => v % 3 === 0,
            message: props => `${props.value} is not divisible by 3`
        },
    ]
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

UserSchema.methods.sayHi = function(){
    console.log(`Hi, my name is ${this.name}`)
}

UserSchema.methods.getAge = function(){
    console.log(`Hi, my age is ${this.age}`)
}

UserSchema.statics.findByName = function(name){
    return this.where({name : new RegExp(name, 'i')}).limit(1)
}

UserSchema.virtual('namedEmail').get(function(){
    return `${this.name}<${this.email}>`
}) 

module.exports = mongoose.model('User', UserSchema)