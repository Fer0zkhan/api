const mongoose = require('mongoose');


const rideSchema = mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    driverId: {
        type: String,
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    pickLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model("Rides", rideSchema);