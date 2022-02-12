const {model, Schema} = require('mongoose')

const UserSchema = Schema({

    name:{
        type: String,
        required: [true, 'Name is required']
    },
    lastname:{
        type: String,
        required: [true, 'Lastname is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    phone:{
        type: String,
    },

})

UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}


module.exports = model('User', UserSchema)