require('dotenv/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

//Import Routes
const adminRoute = require('./routes/admin');
const customerRoute = require('./routes/customer');
const driverRoute = require('./routes/driver');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/admin', adminRoute);
app.use('/customer', customerRoute);
app.use('/driver', driverRoute);

//Database connectivity
mongoose.connect(process.env.DATABASE_NAME, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Database connection successfully");
});

//Server
app.listen(process.env.PORT || 3000, () => console.log(`Server running at port ${process.env.PORT || 3000}`))
