const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // login user with static method
    const user = await User.login(email, password);
    const { _id, username } = user;
    const token = generateToken(user._id);
    // add jwt to headers
    res.status(200).json({ _id, username, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function registerUser(req, res) {
  // get new user info from request body
  const { username, email, password } = req.body;

  try {
    // create new user with static method
    const user = await User.signup(username, email, password);
    const token = generateToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { loginUser, registerUser };
