/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema } = mongoose;

const customerSchema = new Schema({
    isGold: { type: Boolean, default: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
        isGold: Joi.boolean(),
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.Validate = validateCustomer;

