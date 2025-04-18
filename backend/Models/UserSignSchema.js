const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSign = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true,
    },
    confirmpassword:{
        type:String,
    }
})

module.exports = mongoose.model('UserDetails', UserSign);