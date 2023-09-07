const express = require('express');
const adminRoute = express();
const Driver = require('../models/Driver');
const bycript = require('bcrypt');
const { driverRegistraterValidation } = require('../validation/validation');


//Drivar Registration
adminRoute.post('/driverRegistration', async(req, res) => {

    //Validation
    const { error } = driverRegistraterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //If user Already Exits
    const driver = await Driver.findOne({ email: req.body.email });
    if (driver) return res.status(400).send({ "message": "Email Already Exits" });


    //hash password
    const salt = await bycript.genSalt(10);
    const hashedPassword = await bycript.hash(req.body.password, salt);

    //New Driver
    const newDriver = new Driver({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const registeredDriver = await newDriver.save(() => {
            console.log("Driver Rgistered Successfully");
        });
        
        res.json(registeredDriver);
    } catch (error) {
        res.json({ "message": error });
    }
});

module.exports = adminRoute;
