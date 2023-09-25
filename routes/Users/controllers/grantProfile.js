const { default: to } = require("await-to-js");
const constants = require("../../../constants");
const { ErrorHandler } = require("../../../helpers/error");
const { verifyToken } = require("../../../middleware/authMiddleware");
const userDb = require("../database/index");

module.exports = async (req, res, next) => {
    const token = req.body.token;
    const userId = req.body.email;


    if (token === undefined || userId === undefined) {
        return next(new ErrorHandler(constants.ERRORS.INPUT, {
            statusCode : 400,
            message : "Insufficient Data"
        }));
    }

    const [err, payload] = await to(verifyToken(token, process.env.IDP_SERVER_JWT_SECRET));

    if (err) {
        return next(new ErrorHandler(constants.ERRORS.AUTH, {
            statusCode : 401,
            message : "Unauthorized Access"
        }));
    }

    const requirements = payload.fields;


    try {
        const details = await userDb.getUserByEmail(userId);

        if (details.length !== 1) {
            return next(new ErrorHandler(constants.ERRORS.AUTH, {
                statusCode : 404,
                message : "User Not Found"
            }))
        } 

        const grantedDetails = {};

        for (key in requirements) {
            console.log(key);
            grantedDetails[requirements[key]] = details[0][requirements[key]];
        }

        return res.status(200).send({
            data : grantedDetails
        });
    } catch(error) {
        console.log(error);

        return next(new ErrorHandler(constants.ERRORS.UNEXPECTED, {
            statusCode : 500,
            message : "Unexpected Error"
        }))
    }
}