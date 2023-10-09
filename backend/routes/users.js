const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createUser, loginUser, validateBody } = require("../utils/validators");

router.post("/", validateBody(createUser), async (req, res) => {
  try {
    const { name, phone, email, password, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      userType,
    });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: error?.message });
  }
});

router.post("/signin", validateBody(loginUser), async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Email or Password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Email or Password" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      userType: user.userType,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.status(200).json({
    success: true,
    message: "Sign In Successful!",
    userType: user.userType,
    token,
  });
});

module.exports = router;
