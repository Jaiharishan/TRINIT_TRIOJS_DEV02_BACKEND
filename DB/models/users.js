const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    profilePic: String,
    ownOrg: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation'
    }],
    employeeAt: [{
        orgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organisation'
        },
        rank: {
            type: String,
            enum: ['rank1', 'rank2']
        }
    }],
    bugsAssigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }],
    description: String
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);