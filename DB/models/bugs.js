const mongoose = require('mongoose')

const bugSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['open', 'close'],
        default: 'open'
    },
    severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe']
    },
    closedAt: Date,
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion'
    }]
}, { timestamps: true })
module.exports = mongoose.model('Bug', bugSchema);