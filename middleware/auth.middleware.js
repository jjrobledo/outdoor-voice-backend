const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  // try to get jwt from headers
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "401 - Unauthorized" });
  }

  // split the token string to seperate the token from the string - eg: "bearertoken 2098347s0d98af..."
  const jwtToken = authorization.split(" ")[1];

  try {
    // check if token is valid
    const { _id } = jwt.verify(jwtToken, process.env.SECRET);

    // add user id to request
    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    res.status(401).json({ error: "401 - Unauthorized" });
  }
};

module.exports = authenticate;
