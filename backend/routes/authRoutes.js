const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { loginLimiter } = require("../middleware/loginLimiter");
const  verifyJWT  = require("../middleware/verifyJWT");

router.route("/").post(authController.authUser);

module.exports = router;
