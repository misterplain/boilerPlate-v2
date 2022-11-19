const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const { loginLimiter } = require("../middleware/loginLimiter");
const  verifyJWT  = require("../middleware/verifyJWT");

router.post("/", registerController.registerUser);

module.exports = router;