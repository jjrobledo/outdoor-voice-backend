const router = require("express").Router();
const authenticate = require("../middleware/auth.middleware");
const {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/posts.controllers");

// TODO
// - protect routes with auth middelware
router.use(authenticate);

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").patch(updatePost).delete(deletePost);

module.exports = router;
