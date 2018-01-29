const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const interestSchema = new mongoose.Schema({
    contestant : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true 
    },
    position: String,
    category: String,
    time:{
        type: Date,
        default: Date.now()
    },
    count: {
        type: Number,
        default:1
    },
    achieve:{
        type: Number,
        default:1
    },
    paid: {
        type: Boolean,
        default: false
    },
    level: String,
    posterPic: String,
    full_name: String,
    voterCard: String,
    maritalStatus: String,
    WithKids: String,
    address: String,
    eduLevel: String,
    secondarySch: String,
    highInstitution: String,
    SechighInstitution: String,
    placeofwork: String,
    positionofwork: String,
    

})

module.exports = mongoose.model('ExpressOfInterest', interestSchema);