const router = require("express").Router({ mergeParams : true });
const validator = require("../../middleware/validator");
const { createUserSchema } = require("./@validationSchemas");
const post = require("./controllers/post");

router.post("/", validator(createUserSchema), post);

module.exports = router;