const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const excoSchema = new  mongoose.Schema({
    personalInfo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member',
        required: true
    },
    adminInfo:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin',
        required: true
    },
    category: String,
    level: String,
    position: String,
    approve: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type:Date,
        default: Date.now
    },
    state: String,
    lga: String,
    ward: String,
    pollingUnit: String


})

module.exports = mongoose.model('Exco', excoSchema);