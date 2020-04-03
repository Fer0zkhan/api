const express = require('express');
const driverRoute = express();
const Driver = require('../models/Driver');
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');
const Request = require('../models/Request');
const { driverLoginValidation } = require('../validation/validation');
const verify = require('./verifyToken');
const Ride = require('../models/Ride');
const History = require('../models/History');
require('dotenv/config');

driverRoute.post('/driverLogin', async(req, res) => {
    //Validation
    const { error } = driverLoginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //If Email Exits
    const driver = await Driver.findOne({ email: req.body.email });
    if (!driver) return res.status(400).send({ "message": "Email not Found" });

    //Password correct 
    const validPassword = await bycript.compare(req.body.password, driver.password);
    if (!validPassword) return res.status(400).send({ "message": "Invalid Password" });

    const accessToken = jwt.sign({ _id: driver._id }, process.env.TOKEN_SECRET);
    res.header({ "auth-Token": accessToken });
    res.json({ "auth-Token": accessToken });
});

//get request with in 5km of area with jwt
driverRoute.get('/getRequestIn5km', verify, async(req, res) => {
    try {
        const getRequest = await Request.find({});
        res.send(getRequest);
    } catch (error) {
        res.status(400).send({ "message": error });
    }
});

//driver go and Pick up 
driverRoute.post('/comingToPickUp', verify, async(req, res) => {
    const newRide = new Ride({
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        driverId: req.body.driverId,
        driverName: req.body.driverName,
        pickLocation: req.body.pickLocation,
        dropLocation: req.body.dropLocation
    });
    try {
        const ride = await newRide.save();
        res.send(ride);

    } catch (error) {
        res.status(400).send({ "message": error });
    }
});

//customer pick from pick up
driverRoute.post('/customerPickUp', verify, async(req, res) => {
    const newRide = new Ride({
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        driverId: req.body.driverId,
        driverName: req.body.driverName,
        pickLocation: req.body.pickLocation,
        dropLocation: req.body.dropLocation
    });
    try {
        const ride = await newRide.save();
        res.send(ride);

    } catch (error) {
        res.status(400).send({ "message": error });
    }
});

//Ride End
driverRoute.post('/endRide', verify, async(req, res) => {
    const newHistory = new History({
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        driverId: req.body.driverId,
        driverName: req.body.driverName,
        pickLocation: req.body.pickLocation,
        dropLocation: req.body.dropLocation,
        cost: parseInt(req.body.areaCoverInKm) * 10
    });
    try {
        const history = await newHistory.save();
        res.send(history);
    } catch (error) {
        res.status(400).send().send({ "message": error });
    }
});

//see History
driverRoute.get('/getHistory', verify, async(req, res) => {
    try {
        const getHistory = await History.find({});
        res.send(getHistory);
    } catch (error) {
        res.status(400).send({ "message": error });
    }
});

module.exports = driverRoute;