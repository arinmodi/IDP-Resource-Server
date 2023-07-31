const Joi = require("joi");

const createUserSchema = Joi.object({
    FirstName : Joi.string().min(2).max(20).required(),
    LastName : Joi.string().min(2).max(20).required(),
    Email : Joi.string().min(5).max(30).required(),
    ContactNo : Joi.string().min(10).max(10).required()
});

module.exports = {
    createUserSchema
}