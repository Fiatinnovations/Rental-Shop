const express = require('express');
const router = express.Router();
const { Customer, Validate } = require('../models/customer');
/**mongoose
    .connect('mongodb://localhost/customers', { useNewUrlParser: true })
    .then(() => console.log('successfully connected to the database'))
    .catch(error => console.log(error)); */

router.post('/', async (req, res) => {
    try {
        const { error } = Validate(req.body);
        if (error) res.status(404).send(error.details[0].message);
        let customer = new Customer({
            isGold: true,
            name: req.body.name,
            phone: req.body.phone,
        });
        customer = await customer.save();
        res.send(customer);
    } catch (error) {
        console.log(error);
    }
});


router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name');
        res.send(customers);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer)
            res.status(404).send(
                'There is no Customer by this ' + req.params.id
            );
        res.send(customer);
    } catch (error) {
        res.send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = Validate(req.body);
        if (error) res.status(404).send(error.details[0].message);
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                phone: req.body.phone,
                isGold: req.body.isGold,
            },
            { new: true }
        );
        if (!customer) res.status(404).send('There is no Customer by this ID');
        res.send(customer);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer)
            res.status(404).send(
                'There is no Customer by this ' + req.params.id
            );
        res.send(customer);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
