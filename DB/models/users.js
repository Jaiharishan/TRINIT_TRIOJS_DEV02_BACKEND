const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    profilePic: String,
    employeeAt: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation'
    }],
    description: String
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);