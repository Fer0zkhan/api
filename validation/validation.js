//validation
const Joi = require('@hapi/joi');

//Customer Validation
const customerRegistraterValidation = (data) => {
    const customerRegisterSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return customerRegisterSchema.validate(data);
}

const customerLoginValidation = (data) => {
    const customerLoginSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return customerLoginSchema.validate(data);
}

//Driver Validation
const driverRegistraterValidation = (data) => {
    const driverRegisterSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return driverRegisterSchema.validate(data);
}

const driverLoginValidation = (data) => {
    const driverLoginSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return driverLoginSchema.validate(data);
}



module.exports.customerRegistraterValidation = customerRegistraterValidation;
module.exports.customerLoginValidation = customerLoginValidation;
module.exports.driverRegistraterValidation = driverRegistraterValidation;
module.exports.driverLoginValidation = driverLoginValidation;
