const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const app = express();

const postRouter = require("./routes/posts.routes.js");
const userRouter = require("./routes/users.routes.js");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

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
