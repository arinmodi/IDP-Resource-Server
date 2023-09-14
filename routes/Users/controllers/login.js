const userDb = require("../database/index");
const { ErrorHandler } = require("../../../helpers/error");
const constants = require("../../../constants");
const argon2 = require("argon2");
const { generateJWT } = require("../../../middleware/authMiddleware");

module.exports = async (req, res, next) => {
    const { Email, Password } = req.body; 

    const data = await userDb.getUserByEmail(Email);


    if (data.length > 0) {
        if (await argon2.verify(data[0].Password, Password) ) {
            const payLoad = {
                name : data[0].FirstName + " " + data[0].LastName,
                email : data[0].Email
            }

            const jwtToken = generateJWT(payLoad, process.env.JWT_SECRET_AUTH, "1d");

            return res.status(200).send({
                message : "Login Successfully...",
                token : jwtToken,
                emailStaus : data[0].isEmailVerified
            })
        }else {
            return next(new ErrorHandler(constants.ERRORS.INPUT, {
                statusCode : 400,
                message : "Invalid password"            
            }));
        }
    }else {
        return next(new ErrorHandler(constants.ERRORS.INPUT, {
            statusCode : 400,
            message : "User Not Exists...",
        }));
    }
}