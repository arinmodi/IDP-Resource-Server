const constants = require("../constants");
const { ErrorHandler } = require("../helpers/error");

const serverValidator = async (req, res, next) => {
    const token = req.body.token;

    if (token === process.env.IDP_SERVER_AUTH) {
        res.locals.decode = req.body
    }else {
        const error = new ErrorHandler(constants.ERRORS.AUTH, {
            statusCode: 401,
            errStack: err2,
            message: 'Unauthorized Access',
        });

        return next(error);
    }

    next();
}

module.exports = {
    serverValidator
}