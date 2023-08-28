const router = require("express").Router({ mergeParams : true });
const multer = require("multer");

const { authMiddlewareForEmailVerification, authMiddlewareForLogin } = require("../../middleware/authMiddleware");
const validator = require("../../middleware/validator");

const { createUserSchema, loginUserSchema, onlyEmailSchema, updateProfileSchema, addAccessHistorySchema } = require("./@validationSchemas");

const login = require("./controllers/login");
const post = require("./controllers/post");
const requestEmailVerification = require("./controllers/requestEmailVerification");
const verifyEmail = require("./controllers/verifyEmail");
const uploadProfilePhoto = require("./controllers/uploadProfilePhoto");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const getMySelf = require("./controllers/getMySelf");
const updateMyProfile = require("./controllers/updateMyProfile");
const deleteAccount = require("./controllers/deleteAccount");
const addAccessHistory = require("./controllers/addAccessHistory");
const getAccessHistory = require("./controllers/getAccessHistory");

router.post("/", validator(createUserSchema), post);
router.post("/login", validator(loginUserSchema), login);
router.post("/uploadImage", multer().array("image", 1), uploadProfilePhoto);
router.post("/requestEmailVerification", validator(onlyEmailSchema), requestEmailVerification);
router.post("/forgotPassword", validator(onlyEmailSchema), forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/addAccessHistory", authMiddlewareForLogin, validator(addAccessHistorySchema), addAccessHistory);

router.get("/verifyEmail", authMiddlewareForEmailVerification, verifyEmail);
router.get("/mySelf", authMiddlewareForLogin, getMySelf);
router.get("/myAccessHistory", authMiddlewareForLogin, getAccessHistory);

router.patch("/mySelf", authMiddlewareForLogin, validator(updateProfileSchema), updateMyProfile);

router.delete("/mySelf", authMiddlewareForLogin, deleteAccount);

module.exports = router;