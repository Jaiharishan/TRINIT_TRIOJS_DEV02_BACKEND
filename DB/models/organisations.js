const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema({
    name: String,
    description: String,
    profilePic: String,
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rank1: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rank2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    bugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }]
}, { timestamps: true })
module.exports = mongoose.model('Organisation', orgSchema);