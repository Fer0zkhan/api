const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pickUpLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Requests', requestSchema);