const router = require("express").Router();
const authenticate = require("../middleware/auth.middleware");
const { getAllPosts, createPost } = require("../controllers/posts.controllers");

// TODO
// - protect routes with auth middelware
// - add patch and delete routes

// router.use(authenticate);

router.get("/", getAllPosts);

router.post("/", createPost);

// router.delete("/:id", deletePost);
// router.patch("/:id", updatePost)

module.exports = router;
