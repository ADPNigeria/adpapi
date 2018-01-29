const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const crypto = require("crypto");
let random = crypto.randomBytes(15).toString('hex');

const authSchema = new  mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        require: true
    },
    key:{
        type:String,
        default: random
    }
    
})


module.exports = mongoose.model('Auth', authSchema);