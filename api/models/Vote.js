const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const voteSchema = new mongoose.Schema({
    position: String,
    voterId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    contestantId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'ExpresionOfInter'
    },
    dateCreated: {
        type:Date,
        default: Date.now
        },
})
module.exports = mongoose.model('Vote', voteSchema);