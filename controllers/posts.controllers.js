const Post = require("../models/post.model");

async function createPost(req, res) {
  // TODO check req.body to make sure there it is not empty

  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getAllPosts(req, res) {
  // TODO check req.body to make sure there it is not empty

  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { getAllPosts, createPost };
