const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const PORT = 5000;

const app = express();

const postRouter = require("./routes/posts.routes.js");
const userRouter = require("./routes/users.routes.js");

app.use(cors());

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
