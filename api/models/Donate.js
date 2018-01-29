
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const donateSchema = new mongoose.Schema({
    full_name: String,
    phone_number: String,
    email: String,
    status:String,
    amonut: String,
    referance: String,
    trsrf:String,
    purpose: String,
    time: {
        type: Date,
        default: Date.now()
    }
    

})
module.exports = mongoose.model('Donate', donateSchema);