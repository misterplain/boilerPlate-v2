const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogsController");

router.route("/").get(blogsController.getAllBlogs);

//protected routes requiring authorization
// router.use(verifyJWT);
router
  .route("/")
  .post(blogsController.addBlog)
  .delete(blogsController.deleteBlog);

module.exports = router;
