const mongoose = require('mongoose')

const Cls = mongoose.model('Cls', new mongoose.Schema({
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

exports.Cls = Cls