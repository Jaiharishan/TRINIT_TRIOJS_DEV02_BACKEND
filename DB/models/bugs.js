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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignRequests: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe']
    },
    visibility: {
        type: String,
        enum: ['private', 'public']
    },
    closedAt: Date,
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discuss'
    }]
}, { timestamps: true })
module.exports = mongoose.model('Bug', bugSchema);