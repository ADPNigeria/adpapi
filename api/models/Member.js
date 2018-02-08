const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require("crypto");
const md5 = require('md5');

//random codes for mail verification
let random = crypto.randomBytes(6).toString('hex');


const memberSchema = new mongoose.Schema({
    passport: String,
    full_name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    },
    phone_number:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    gender: String,
    pvc: String,
    dateofBirth: String,
    stName: String,
    lgaName: String,
    wardName: String,
    pollingUnit: String,
    residenceAdd: String,
    resCountry: String,
    hashUser: String,
    dateCreated: {
        type:Date,
        default: Date.now
        },
    MemberAuth:{
        TempID: String,
        CardID: {
            type:String,
            default: ''
    },
        mobileCode:String
    },
    SMSVerified: {
        type: Boolean,
        default: false
    },
    MemberVerified: {
        type: Boolean,
        default: false
    },
    adminLevel:{
      type: String,
      default: 'Member'
    },
    Senatorial: String,
    FedConstituency: String,
    StateConstituency: String,


}, {autoIndex: true});


mongoose.model('Member', memberSchema)
module.exports = mongoose.model('Member');
