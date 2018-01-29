const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require("crypto");

//random codes for mail verification
random = (howMany, chars) => {
    chars = chars
        || "ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    let rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (let i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');
}

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
        // unique: true,
        lowercase: true,
        trim: true,
        required: 'Please Supply an email address'
    },
    gender: String,
    pvc: String,
    dateofBirth: String,
    stName: String,
    lgaName: String,
    ward: String,
    pollingUnit: String,
    residenceAdd: String,
    resCountry: String,
    adminLevel: {
        type: String,
        default: "Member"
    },
    hashUser: {
        type: String,
        default: random(12),
        unique:true
    },
    dateCreated: {
        type:Date,
        default: Date.now
        },
    MemberAuth:{
        TempID: {
            type:String,
        default: random(6)
    },
        CardID: {
            type:String,
            default: ''
    },
        mobileCode:{
            type:(String),
        default: random(8)
    },
    },
    SMSVerified: {
        type: Boolean,
        default: false
    },
    MemberVerified: {
        type: Boolean,
        default: false
    },
    adminLevel:String,
    Senatorial: String,
    FedConstituency: String,
    StateConstituency: String,


}, {autoIndex: true});


mongoose.model('Member', memberSchema)
module.exports = mongoose.model('Member');

