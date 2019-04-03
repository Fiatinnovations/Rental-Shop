const mongoose = require('mongoose');
const Joi = require('joi');
joi.objectId = require('joi-objectid')(joi);


const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String, required: true, max: 255 },
    email: { type: String, trim: true, unique: true, lowercase: true, required: true },
    password: { type: String, required: true }

});

const User = mongoose.model('User', UserSchema);


validateUser = (User) => {
    const schema = {
        name: Joi.string().required().max(255),
        email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().required(),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
    return validate(User, schema);

}

exports.User = User;
exports.Validate = validateUser;