const mongoose = require('mongoose')

const discussSchema = new mongoose.Schema({
    description: String,
    openedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discuss'
    }]
}, { timestamps: true })
module.exports = mongoose.model('Discuss', discussSchema);