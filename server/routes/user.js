const express = require("express");
const router = express.Router();
const passport = require('passport');

const {
  logIn,
  signUp,
  sendOTP,
  myProfile,
  logout,
} = require("../controllers/Authentication");
const { isAuthenticated } = require("../middlewares/auth");


router.post("/login", logIn);

router.post("/signup", signUp);

router.post("/sendotp", sendOTP);

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get('/me', isAuthenticated, myProfile);
router.get('/logout', logout);

module.exports = router;