/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const auth = require('../middleware/auth');

const router = express.Router();
const { Validate, Rental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');


Fawn.init(mongoose);


router.get('/', auth, async (req, res) => {
    try {
        const rentals = await Rental.find();
        if (!rentals) res.status(400).send('No renatals yet');
        res.send(rentals);
    } catch (error) {
        console.log(error);

    }

});

router.post('/', auth, async (req, res) => {

    const { error } = Validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) res.status(400).send('Customer does not Exist');
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) res.status(400).send('Movie ID is not available');
    if (movie.numberInStock === 0) res.status(400).send('Movie out of Stock');
    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
            .run();
        res.send(rental);
    } catch (ex) {
        res.status(404).send(error);

    }



});

router.get('/:id', auth, async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) res.status(404).send('Rental Id doesn not exist');
        res.send(rental);
    } catch (error) {
        console.log(error);

    }

})

router.put('/:id', auth, async (req, res) => {
    try {
        const { error } = Validate(req.body);
        if (error) res.status(400).send(error.details[0].message);
        const customer = await Customer.findById(req.params.id);
        if (!customer) res.status(404).send('Customer Id does not exist');
        const movie = await Movie.findById(req.params.id);
        if (!movie) res.status(404).send('Movie not available');
        const rental = await Rental.findByIdAndUpdate(req.params.id,
            {
                customer: {
                    _id: customer._id,
                    name: customer.name,
                    phone: customer.phone,
                    isGold: customer.isGold
                },
                movie: {
                    _id: movie._id,
                    name: movie.name,
                    dailyRentalRate: movie.dailyRentalRate

                }

            }, { new: true }
        );

        if (!rental) res.status(404).send(`Rental ${req.params.id} does not exist `)
        res.send(rental);
    } catch (error) {
        console.log(error);

    }


})

module.exports = router;