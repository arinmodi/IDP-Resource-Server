const argon2 = require("argon2");

const userDb = require("../database/index");

const constants = require("../../../constants");
const { ErrorHandler } = require("../../../helpers/error");
const { verifyToken } = require("../../../middleware/authMiddleware");
const { default: to } = require("await-to-js");

module.exports = async (req, res, next) => {
    if (req.body.token === undefined || req.body.password === undefined) {
        return next(new ErrorHandler(constants.ERRORS.INPUT, {
            statusCode : 400,
            message : "Insufficient Data"
        }));
    }

    const [err, payload] = await to(verifyToken(req.body.token, process.env.JWT_SECRET_FORGOT_PASSWORD));

    if (err) {
        return next(new ErrorHandler(constants.ERRORS.INPUT, {
            statusCode : 401,
            message : "Unauthorized request or expired link"
        }));
    }

    const { Email } = payload;

    const Password =  await argon2.hash(req.body.password)

    const result = await userDb.updateUserDetails({ Password : Password }, Email);

    if (!result) {
        return next(new ErrorHandler(constants.ERRORS.UNEXPECTED, {
            statusCode : 500,
            message : "Unexpected DB Error"
        }));
    }

    console.log("success");

    return res.status(200).send({
        message : "Password Reset Success"
    })

}