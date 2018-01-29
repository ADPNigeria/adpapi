
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const blogSchema = new mongoose.Schema({

    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags:[],
    dateCreated:{
        type: Date,
        default : Date.now
    }

})

module.exports = mongoose.model('Blog', blogSchema)