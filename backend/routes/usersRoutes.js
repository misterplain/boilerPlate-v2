const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { loginLimiter } = require("../middleware/loginLimiter");
// const verifyJWT = require("../middleware/verifyJWT");
const {protect} = require("../middleware/authMiddleware");

router.route("/").get(usersController.getAllUsers);

//protected routes requiring authorization
// router.use(verifyJWT);
router.use(protect);
router
  .route("/profile")
  .get(usersController.getUserDetails)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
