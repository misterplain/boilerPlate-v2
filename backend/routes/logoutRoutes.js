const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");
const { loginLimiter } = require("../middleware/loginLimiter");
const  verifyJWT  = require("../middleware/verifyJWT");

router.post("/", logoutController.logout);

module.exports = router;