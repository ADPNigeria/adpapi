const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const adminSchema = new  mongoose.Schema({
    phone:{
        type: String,
        required: true,
        trim: true
    },
    personalInfo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member',
        required: true
    },
    level: String,
    position: String,
    nameOfLocation: String,
    dateCreated: {
        type:Date,
        default: Date.now
        },
    approve: {
        type : Boolean,
        default: false
    }
})

module.exports = mongoose.model('Admin', adminSchema);