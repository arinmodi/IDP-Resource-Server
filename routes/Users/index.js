const router = require("express").Router({ mergeParams : true });
const multer = require("multer");

const { authMiddlewareForEmailVerification } = require("../../middleware/authMiddleware");
const validator = require("../../middleware/validator");

const { createUserSchema, loginUserSchema, onlyEmailSchema } = require("./@validationSchemas");

const login = require("./controllers/login");
const post = require("./controllers/post");
const requestEmailVerification = require("./controllers/requestEmailVerification");
const verifyEmail = require("./controllers/verifyEmail");
const uploadProfilePhoto = require("./controllers/uploadProfilePhoto");

router.post("/", validator(createUserSchema), post);
router.post("/login", validator(loginUserSchema), login);
router.post("/requestEmailVerification", validator(onlyEmailSchema), requestEmailVerification);
router.post("/uploadImage", multer().array("image", 1), uploadProfilePhoto);

router.get("/verifyEmail", authMiddlewareForEmailVerification, verifyEmail);

module.exports = router;