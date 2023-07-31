const router = require("express").Router({ mergeParams : true });
const userRoutes = require("./Users");

router.use("/user", userRoutes);

module.exports = router;