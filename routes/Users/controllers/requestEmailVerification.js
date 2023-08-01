const userDb = require("../database/index");

const constants = require("../../../constants");
const { ErrorHandler } = require("../../../helpers/error");
const { generateJWT } = require("../../../middleware/authMiddleware");
const { sendEmail } = require("../../utilities/sendEmail");

module.exports = async (req, res, next) => {
    const data = await userDb.getUserByEmail(req.body.Email);

    if (data.length > 0) {
        const token = generateJWT({ Email : req.body.Email }, process.env.JWT_SECRET_EMAIL, "2h");
        const content  = "Verify Your Email By Clicking At Below Link\n"+process.env.EMAIL_VERIFY_PAGE_LINK+"?token="+token;
        sendEmail(process.env.EMAIL_ID, req.body.Email, "Email Verification Needed For " + process.env.APP_NAME, content);
        return res.status(200).send({
            message : "Email Sent"
        })
    }else {
        return next(new ErrorHandler(constants.ERRORS.INPUT, {
            statusCode : 400,
            message : "User Not Exists...",
        }));
    }
}