const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserAddress = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
        required: true,
    },
    name: {
        type: String,
    },
    phoneno: {
        type: String,
    },
    address: {
        type: String,
    },
    pincode: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    }
})

module.exports = mongoose.model('userAddress', UserAddress)