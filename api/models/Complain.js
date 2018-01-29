const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const complainSchema = new  mongoose.Schema({
   
    name: String,
    subject: String,
    message: String,
    tags: String,
    status:{
        type: Boolean,
        default: false
    },
    dateCreated: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Complain', complainSchema)