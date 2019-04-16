const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config')
// Joi.objectId = require('joi-objectid')(Joi);

// This is same as const Schema = mongoose.Schema. This is called object destructuring
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: { type: String, required: true, max: 255, min: 5 },
    email: { type: String, trim: true, unique: true, lowercase: true, required: true },
    password: { type: String, required: true }

});

// eslint-disable-next-line func-names
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;

}

const User = mongoose.model('User', UserSchema);


// eslint-disable-next-line no-undef
validateUser = (user) => {
    const schema = {
        name: Joi.string().required().min(5).max(255),
        email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().required(),
        password: Joi.string().required().min(5).max(255)
    }
    return Joi.validate(user, schema);

}

exports.User = User;
// eslint-disable-next-line no-undef
exports.Validate = validateUser;