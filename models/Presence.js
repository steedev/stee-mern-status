const mongoose = require('mongoose')

const Presence = mongoose.model('Presence', new mongoose.Schema({
    teacher: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    pupils: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}))

exports.Presence = Presence