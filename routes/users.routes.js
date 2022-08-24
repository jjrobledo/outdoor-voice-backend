const router = require("express").Router();
const { loginUser, registerUser } = require("../controllers/users.controllers");

router.post("/", registerUser);

router.get("/", loginUser);

module.exports = router;
