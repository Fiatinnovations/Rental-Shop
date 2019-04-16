/* eslint-disable no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');


const router = express.Router();
const { User } = require('../models/user');

const validate = (req) => {
    const schema = {
        email: Joi.string().email({ minDomainAtom: 2 }).lowercase().required(),
        password: Joi.string().required().min(5).max(255)
    }
    return Joi.validate(req, schema);

}




router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    if (error) res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send('invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);

});


module.exports = router