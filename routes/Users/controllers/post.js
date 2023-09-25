const userDb = require("../database/index");
const { ErrorHandler } = require("../../../helpers/error");
const constants = require("../../../constants");
const argon2 = require("argon2");

module.exports = async (req, res, next) => {
    const data = { ...req.body };
    data.Password = await argon2.hash(data.Password);
    data.Email = (data.Email + "").toLowerCase();
    const result = await userDb.addUser(data);

    if (result != null) {
        const errorCreatingUser = new ErrorHandler(constants.ERRORS.INPUT, {
            statusCode : 400,
            message : "May be user already exists",
            errStack : result
        });

        return next(errorCreatingUser);
    }
    console.log(result)
    return res.status(200).send({
        message : "Successfully Added The User. Thank You."
    });
}