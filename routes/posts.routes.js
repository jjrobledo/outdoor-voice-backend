const router = require("express").Router();
const { getAllPosts, createPost } = require("../controllers/posts.controllers");

router.post("/", createPost);

router.get("/", getAllPosts);

module.exports = router;
