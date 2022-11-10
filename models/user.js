const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name : {
        type: String,
        required : [true, 'Name required']
    },
    lastName : {
        type: String,
        required: [true, 'Last name required']
    },
    address : {
        type: String,
        default:''
    },
    city : {
        type: String,
        default:''
    },
    state : {
        type: String,
        default:''
    },
    cp : {
        type: String,
        default:''
    },
    country : {
        type: String,
       default:''
    },
    email:{
        type: String,
        unique : [true, 'email unique']
    },
    password :{
        type: String,
        required: [true, 'password required']
    },
    status :{
        type: Boolean,
        default : true
    }
})

userSchema.methods.toJSON = function (){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', userSchema);