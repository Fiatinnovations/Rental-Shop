/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const express = require('express');

const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');


const router = express.Router();




router.get('/', async (req, res, ) => {
    try {
        const movies = await Movie.find().sort('title');
        res.send(movies);
    } catch (error) {
        console.log(error);

    }

})

// eslint-disable-next-line consistent-return
router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const genre = await Genre.findById(req.body.genreId);
        console.log(genre);
        if (!genre) res.status(404).send('Genre not found')
        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

        movie = await movie.save();
        res.send(movie);
    } catch (error) {
        console.log(error);

    }

});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) return res.status(404).send('This ID does not exist');
        res.send(movie);
    } catch (error) {
        console.log(error);

    }

});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) res.status(400).send(error.details[0].message);
        const genre = await Genre.find(req.body.genreId);
        if (!genre) res.status(400).send('This Genre does not exist');
        const movie = await Movie.findByIdAndUpdate(
            req.params.id, {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRental: req.body.dailyRental,
            },
            { new: true }

        );
        if (!movie) res.status(404).send('movie not available');
        res.send(movie);
    } catch (error) {
        console.log(error);

    }


});

router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id);
        if (!movie) res.status(404).send('This ID is not available');
        res.send(movie);
    } catch (error) {
        console.log(error);

    }

});

module.exports = router;