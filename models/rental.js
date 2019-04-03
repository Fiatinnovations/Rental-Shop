const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                trim: true,
                required: true,
                min: 5,
                max: 250
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,

            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                trim: true,
                type: String,
                required: true,
                min: 5,
                max: 250
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true


    },
    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

const validateRental = (rental) => {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }
    return Joi.validate(rental, schema)

}

exports.Rental = Rental;
exports.Validate = validateRental;
