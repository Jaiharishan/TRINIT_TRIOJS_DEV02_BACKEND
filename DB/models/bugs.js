const mongoose = require('mongoose')

const bugSchema = new mongoose.Schema({
    title: String,
    description: String,
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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
        ref: 'Discuss'
    }]
}, { timestamps: true })
module.exports = mongoose.model('Bug', bugSchema);