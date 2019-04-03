const express = require('express');
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
        let user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        user = await user.save();
        res.send(user);
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
    const { error } = validate(req.body);
    if (error) res.status(400).status(error.details[0].message);
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).send('user with ' + req.params.id + ' not found');
    res.send(user);


});