const userDb = require("../database/index");

const constants = require("../../../constants");
const { ErrorHandler } = require("../../../helpers/error");

module.exports = async (req, res, next) => {
    const { email } = res.locals.decode;

    try {
        const details = await userDb.getUserByEmail(email);

        return res.status(200).send({
            data : details
        });
        
    }catch(error) {
        return next(new ErrorHandler(constants.ERRORS.UNEXPECTED, {
            statusCode : 500,
            message : "Unexpected Error"
        }))
    }
}