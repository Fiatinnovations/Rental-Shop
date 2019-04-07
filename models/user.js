const mongoose = require('mongoose');
const Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);


const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String, required: true, max: 255 },
    email: { type: String, trim: true, unique: true, lowercase: true, required: true },
    password: { type: String, required: true }

});

const User = mongoose.model('User', UserSchema);


validateUser = (user) => {
    const schema = {
        name: Joi.string().required().min(5).max(255),
        email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().required(),
        password: Joi.string().required().min(5).max(255)
    }
    return Joi.validate(user, schema);

}

exports.User = User;
exports.Validate = validateUser;