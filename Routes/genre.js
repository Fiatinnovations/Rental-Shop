/* eslint-disable consistent-return */
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();
const { Genre, validate } = require('../models/genre');

router.get('/', auth, async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        res.send(genres);
    } catch (ex) {
        res.status(500).send('Something went wrong')
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('Theres no genre for this ID');
        res.send(genre);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let genre = new Genre({
            name: req.body.name,
        });
        genre = await genre.save();
        res.send(genre);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );

        if (!genre)
            return res.status(404).send('Sorry this ID is not available');

        res.send(genre);
    } catch (error) {
        console.log(error);
    }
    // validate first
});

router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) return res.status(404).send('This genre does not exist');

        res.send(genre);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
