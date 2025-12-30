const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email }); 

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      password 
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Email not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Password is incorrect" });
    }

    // Success
    res.json({ success: true, message: "Login successful", user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    }});

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router; 
