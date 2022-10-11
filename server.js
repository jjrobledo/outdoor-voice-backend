const cloudinary = require("./cloudinary/cloudinary");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = function (req, file, callback) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return callback(new Error("Error: file must be a vaild image"), false);
  }
  callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

const postRouter = require("./routes/posts.routes.js");
const userRouter = require("./routes/users.routes.js");

app.use(cors("*"));

app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `➡️ Connected to MongoDb 🖥️. Server listening on port ${PORT} 🎧`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
