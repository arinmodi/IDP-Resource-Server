const router = require("express").Router({ mergeParams : true });

const { authMiddlewareForEmailVerification } = require("../../middleware/authMiddleware");
const validator = require("../../middleware/validator");

const { createUserSchema, loginUserSchema, onlyEmailSchema } = require("./@validationSchemas");

const login = require("./controllers/login");
const post = require("./controllers/post");
const requestEmailVerification = require("./controllers/requestEmailVerification");
const verifyEmail = require("./controllers/verifyEmail");

router.post("/", validator(createUserSchema), post);
router.post("/login", validator(loginUserSchema), login);
router.post("/requestEmailVerification", validator(onlyEmailSchema), requestEmailVerification);

router.get("/verifyEmail", authMiddlewareForEmailVerification, verifyEmail);

module.exports = router;