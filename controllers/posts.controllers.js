const cloudinary = require("../cloudinary/cloudinary");
const { default: mongoose } = require("mongoose");
const Post = require("../models/post.model");

async function createPost(req, res) {
  // TODO check req.body to make sure there it is not empty

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.body.image,
      {
        upload_preset: "nsigned_uploads",
        allowed_formats: ["png", "jpeg", "jpg", "webp"],
      },
      function (error, result) {
        if (error) {
          console.log(error);
        }
        console.log(result);
      }
    );

    req.body.image = cloudinaryResponse.secure_url;
  } catch (error) {
    req.body.image = "";
    res.status(400).json(error);
  }

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

async function deletePost(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "invalid post id" });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(400).json({ error: "post not found" });
  }
  res.status(200).json(post);
}

const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "invalid post identifier" });
  }

  const post = await Post.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!post) {
    return res.status(400).json({ error: "post not found" });
  }

  res.status(200).json(post);
};

module.exports = { getAllPosts, createPost, deletePost, updatePost };
