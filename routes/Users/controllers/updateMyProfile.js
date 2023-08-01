const userDb = require("../database/index");

const constants = require("../../../constants");
const { ErrorHandler } = require("../../../helpers/error");

module.exports = async (req, res, next) => {
    if (Object.keys(req.body).length > 0) {
        const email = res.locals.decode;

        if (Object.keys(req.body).includes("ContactNo")) {
            req.body.isContactNoVerified = false;
        }

        console.log(req.body);

        const updateResult = await userDb.updateUserDetails(req.body, email);

        if (updateResult) {
            return res.status(200).send({
                message : "Data Updated Successfully"
            })
        }else {
            return next(new ErrorHandler(constants.ERRORS.DATABASE, {
                statusCode : 500,
                message : "Unexpected DB Error",
            }))
        }
    }

    return next(new ErrorHandler(constants.ERRORS.INPUT, {
        statusCode : 400,
        message : "Insufficcient Data"
    }));
}