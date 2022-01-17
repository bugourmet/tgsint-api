const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    phonenum: {
        type: Number,
        required: true
    },
    fbid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: false
    },
    extra: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Persons',PersonSchema);