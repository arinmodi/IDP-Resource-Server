const userDb = require("../database/index");
const { ErrorHandler } = require("../../../helpers/error");
const constants = require("../../../constants");

module.exports = async (req, res, next) => {
    const result = await userDb.addUser(req.body);

    if (result != null) {
        const errorCreatingUser = new ErrorHandler(constants.ERRORS.DATABASE, {
            statusCode : 500,
            message : "Error Inserting User Data",
            errStack : result
        });

        return next(errorCreatingUser);
    }

    return res.status(200).send({
        message : "Successfully Added The User. Thank You."
    });
}