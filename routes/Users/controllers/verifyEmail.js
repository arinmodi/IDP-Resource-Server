const userDb = require("../database/index");
const { ErrorHandler } = require("../../../helpers/error");
const constants = require("../../../constants");

module.exports = async (req, res, next) => {
    const payload = res.locals.decode;

    const updateResult = await userDb.updateUserDetails({ isEmailVerified : true }, payload.Email);

    if (updateResult) {
        return res.status(200).send({
            message : "Email Verified Successfully"
        })
    }else {
        return next(new ErrorHandler(constants.ERRORS.DATABASE, {
            statusCode : 500,
            message : "Unexpected DB Error",
        }))
    }

}