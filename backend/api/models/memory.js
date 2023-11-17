const mongoose = require('mongoose');

const visibility = Object.freeze({
    Private: 'Private',
    Public: 'Public',
    Mutuals: 'Mutuals',
    Group: 'Group'
});

const memorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    accountID: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
    bodyText: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        required: true,
    },
    tags: [String],
    // likes: Number,
    likedBy: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'account' }]
    },
    location : { type: [Number] },
    // images: ,
    visibility: {
        type: String,
        enum: Object.values(visibility),
        required: true
    },
})

module.exports = mongoose.model('memory', memorySchema);