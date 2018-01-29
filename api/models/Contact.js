const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const contactSchema = new  mongoose.Schema({
    adminInfo:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin',
        required: true
    },
    officeNo: String,
    officeEmail: String,
    address: String,
    level: String,
    dateCreated: {
        type:Date,
        default: Date.now
    },
    state: String,
    lga: String,
    ward: String,
})

module.exports = mongoose.model('Contact', contactSchema)