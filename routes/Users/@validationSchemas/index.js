const Joi = require("joi");

const createUserSchema = Joi.object({
    FirstName : Joi.string().min(2).max(20).required(),
    LastName : Joi.string().min(2).max(20).required(),
    Email : Joi.string().min(5).max(40).required(),
    ContactNo : Joi.string().min(10).max(10).required(),
    Password : Joi.string().min(8).max(15).required(),
    ProfilePhoto : Joi.string().uri().required()
});

const updateProfileSchema = Joi.object({
    FirstName : Joi.string().min(2).max(20),
    LastName : Joi.string().min(2).max(20),
    ContactNo : Joi.string().min(10).max(10),
    ProfilePhoto : Joi.string().uri(),
    Access : Joi.array()
});

const loginUserSchema = Joi.object({
    Email : Joi.string().min(5).max(40).required(),
    Password : Joi.string().min(8).max(15).required()
});

const onlyEmailSchema = Joi.object({
    Email : Joi.string().min(5).max(40).required()
});

module.exports = {
    createUserSchema, loginUserSchema, onlyEmailSchema, updateProfileSchema
}