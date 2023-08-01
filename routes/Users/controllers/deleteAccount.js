const userDb = require("../database/index");

const constants = require("../../../constants");
const { ErrorHandler } = require("../../../helpers/error");

module.exports = async (req, res, next) => {
    const email = res.locals.decode;

    const updateResult = await userDb.updateUserDetails({ isDeleted : true }, email);

    if (updateResult) {
        return res.status(200).send({
            message : "Account Deleted Successfully"
        })
    }else {
        return next(new ErrorHandler(constants.ERRORS.DATABASE, {
            statusCode : 500,
            message : "Unexpected DB Error",
        }))
    }
}