const express = require("express");
const router = express.Router();

const { registerUser, loginUser, forgotPassword } = require("../controllers/authController");
const validateUser = require("../middleware/validateUser");

// REGISTER
router.post("/register", validateUser, registerUser);

// LOGIN
router.post("/login", loginUser);

// FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);

module.exports = router;


