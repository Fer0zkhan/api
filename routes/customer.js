const express = require('express');
const customerRoute = express();
const Customer = require('../models/Customer');
const Request = require('../models/Request');
const bycript = require('bcrypt');
const { customerRegistraterValidation, customerLoginValidation } = require('../validation/validation');


//Register a Customer
customerRoute.post('/customerRegistration', async(req, res) => {

    //Validation
    const { error } = customerRegistraterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //If user Already Exits
    const emailExits = await Customer.findOne({ email: req.body.email });
    if (emailExits) return res.status(400).send({ "message": "Email Already Exits" });

    //hash password
    const salt = await bycript.genSalt(10);
    const hashedPassword = await bycript.hash(req.body.password, salt);
    //Make New User
    const newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const registeredCustomer = await newCustomer.save();
        res.send(registeredCustomer);
    } catch (error) {
        res.status(400).send(error);
    }

});

// Login
customerRoute.post('/customerLogin', async(req, res) => {

    //Validation
    const { error } = customerLoginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //If Email Exits
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) return res.status(400).send({ "message": "Email not Found" });

    //Password correct 
    const validPassword = await bycript.compare(req.body.password, customer.password);
    if (!validPassword) return res.status(400).send({ "message": "Invalid Password" });

    res.send('Login Successfully');


});

customerRoute.post('/sendRequest', async(req, res) => {
    const newRequest = new Request({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        pickUpLocation: req.body.pickUpLocation,
        dropLocation: req.body.dropLocation
    });
    try {
        const request = await newRequest.save();
        res.send(request);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = customerRoute;
