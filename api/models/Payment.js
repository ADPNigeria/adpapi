const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const paymentSchema = new mongoose.Schema({

 
    full_name: String,
    phone_number: String,
    email: String,
    status:String,
    amonut: String,
    reference: String,
    trxref: 'String',
    purpose: String,
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
    

})
 module.exports = mongoose.model('Payment', paymentSchema);