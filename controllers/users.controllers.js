const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  // TODO check req.body to make sure there it is not empty
  try {
    const { username, email, password } = req.body;
    // salt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function loginUser(req, res) {
  // TODO check req.body to make sure there it is not empty

  try {
    const { username, password } = req.body;
    // find user
    const user = await User.findOne({ username });
    !user && res.status(400).json("Invalid credentials");

    // check password
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("Invalid credentials");

    // send res
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { loginUser, registerUser };
