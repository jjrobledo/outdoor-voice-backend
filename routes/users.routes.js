const router = require("express").Router();
const { loginUser, registerUser } = require("../controllers/users.controllers");

router.post("/register", registerUser);

router.get("/login", loginUser);

module.exports = router;
