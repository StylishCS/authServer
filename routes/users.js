var express = require("express");
const {
  loginUserController,
  signupUserController,
} = require("../controllers/userAuthController");
var router = express.Router();

/* GET users listing. */
router.post("/login", loginUserController);
router.post("/signup", signupUserController);

module.exports = router;
