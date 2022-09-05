const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 18,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// create a new user
userSchema.statics.signup = async function (username, email, password) {
  // verify all fields are filled out
  if (!username || !email || !password) {
    throw Error("All fields must be filled out");
  }

  // check if email and password pass validation
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Please enter a stronger password");
  }

  // check if email already exists
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }

  // salt and hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create a new user
  const user = await this.create({ username, email, password: hash });

  return user;
};

// login a user
userSchema.statics.login = async function (email, password) {
  // check if fields are filled out
  if (!email || !password) {
    throw Error("All fields must be filled out");
  }

  // check if provided email is in use by valid user
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid credentials");
  }

  // compare provided password with matched hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw Error("Invalid credentials");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
