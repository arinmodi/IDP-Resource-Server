const { ErrorHandler } = require("../../../helpers/error");
const constants = require("../../../constants");

const { uploadFiles } = require("../../utilities/uploadFile");

module.exports = async (req, res, next) => {
    const files = req.files;

    if (!files) {
        return next(new ErrorHandler(constants.ERRORS.INPUT, {
            statusCode : 400,
            message : "Insufficient Inputs",
        }))
    }

    const urls = await uploadFiles(files, "users/profilePics/");

    if (urls.length === files.length) {
        return res.status(200).send({
            message : "Upload Success",
            url : urls[0]
        })
    }

    return next(new ErrorHandler(constants.ERRORS.UNEXPECTED, {
        statusCode : 500,
        message : "Unexpected Error",
    }))
}