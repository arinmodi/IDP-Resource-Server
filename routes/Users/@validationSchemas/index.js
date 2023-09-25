const Joi = require("joi");

const createUserSchema = Joi.object({
    FirstName : Joi.string().min(2).max(20).required(),
    LastName : Joi.string().min(2).max(20).required(),
    Email : Joi.string().min(5).max(40).required(),
    ContactNo : Joi.string().min(10).max(10).required(),
    Password : Joi.string().min(8).max(15).required()
});

const updateProfileSchema = Joi.object({
    FirstName : Joi.string().min(2).max(20),
    LastName : Joi.string().min(2).max(20),
    ContactNo : Joi.string().min(10).max(10),
    ProfilePhoto : Joi.string().uri(),
});

const loginUserSchema = Joi.object({
    Email : Joi.string().min(5).max(40).required(),
    Password : Joi.string().min(8).max(15).required()
});

const onlyEmailSchema = Joi.object({
    Email : Joi.string().min(5).max(40).required()
});

const addAccessHistorySchema = Joi.object({
    website : Joi.string().required(),
    access : Joi.array().min(1).max(7).required()
});

const generateAccessToken = Joi.object({
    token : Joi.string().required(),
    requirements : Joi.array().min(1).max(7).required()
});

module.exports = {
    createUserSchema, loginUserSchema, onlyEmailSchema, updateProfileSchema, addAccessHistorySchema, generateAccessToken
}