/* eslint-disable no-underscore-dangle */
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');


const router = express.Router();
const { User, Validate } = require('../models/user');


router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort('name');
        res.send(users);
    } catch (error) {
        console.log(error);

    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = Validate(req.body);
        if (error) res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) res.status(400).send('User already Exits');
        user = new User(_.pick(req.body, ['name', 'email', 'password']));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user = await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    } catch (error) {
        console.log(error);

    }


});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) res.status(404).send('User does not exist');
        res.send(user);
    } catch (error) {
        console.log(error);

    }

});


router.put('/:id', async (req, res) => {
    try {
        const { error } = Validate(req.body);
        if (error) res.status(400).status(error.details[0].message);
        const user = await User.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, { new: true });
        if (!user) res.status(404).send('user with not found');
        res.send(user);
    } catch (error) {
        console.log(error);

    }



});

router.delete('/:id', async (req, res) => {
    const { error } = Validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) res.status(404).send('User does not exist');
    // Use Lodash to specify the parameter to be displayed back to the user
    res.send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;




