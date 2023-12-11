const userDb = require("../database/index");

const constants = require("../../../constants");
const { ErrorHandler } = require("../../../helpers/error");

module.exports = async (req, res, next) => {
    const { email } = res.locals.decode;
    const fields = req.body.access;
    let website = req.body.website+"";

    website = website.replace(/\./g, "__dot__")

    const fs = fields.join(", ");

    try {
        await userDb.addAccessHistory(website, fs, email);

        return res.status(200).send({
            data : "added"
        });
    }catch(error) {
        console.log(error)
        return next(new ErrorHandler(constants.ERRORS.UNEXPECTED, {
            statusCode : 500,
            message : "Unexpected Error"
        }))
    }
}