const constants = require("../../../constants");
const { ErrorHandler } = require("../../../helpers/error");
const { generateJWT } = require("../../../middleware/authMiddleware");

module.exports = (req, res, next) => {
    try {
        const decode = res.locals.decode;
        const requirements = decode.requirements;

        const payload = {
            fields : requirements
        }

        const expirationMinutes = 5; // Token is valid for 5 minutes
        const expirationTimestamp = Math.floor(Date.now() / 1000) + (expirationMinutes * 60);

        const jwtToken = generateJWT(payload, process.env.IDP_SERVER_JWT_SECRET, expirationTimestamp);

        return res.status(200).send({
            token : jwtToken
        })
    }catch(err) {
        console.log(err);
        const error = new ErrorHandler(constants.ERRORS.UNEXPECTED, {
            statusCode: 500,
            errStack: err,
            message: 'Internal Server Error',
        });

        return next(error);
    }
}