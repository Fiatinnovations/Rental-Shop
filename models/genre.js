const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
});

const Genre = mongoose.model('Genre', genreSchema);

const validateGenre = (genre) => {
    const schema = {
        name: Joi.string()
            .min(5)
            .required(),
    };

    return Joi.validate(genre, schema);
}

async function makeGenre(name) {
    try {
        let genre = new Genre({
            name: name
        });

        genre = await genre;
        genre.save();
        console.log(genre);
    } catch (error) {
        console.log(error);

    }

}

//makeGenre('Authobiography')

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;

