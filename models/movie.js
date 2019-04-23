const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');
Joi.objectId = require('joi-objectid')(Joi)

const { Schema } = mongoose;

const MovieSchema = new Schema({
    title: { type: String, min: 5, max: 250, required: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, min: 0, max: 255, required: true },
    dailyRentalRate: { type: Number, min: 0, max: 255, required: true }
});

const Movie = mongoose.model('Movie', MovieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(250).required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
        genreId: Joi.objectId().required()
    };
    return Joi.validate(movie, schema)
}

exports.MovieSchema = MovieSchema;
exports.Movie = Movie;
exports.validate = validateMovie;
