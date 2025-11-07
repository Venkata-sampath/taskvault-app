const express = require("express");
const router = express.Router();
const {register, login, currentUserInfo} = require("../controllers/authControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", register);
router.post("/login", login);
router.get("/current", validateToken, currentUserInfo);

module.exports = router;