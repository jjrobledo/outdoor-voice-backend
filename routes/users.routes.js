const router = require("express").Router();
const { loginUser, registerUser } = require("../controllers/users.controllers");

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
