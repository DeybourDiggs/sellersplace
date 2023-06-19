const router = require("express").Router();
const User = require("../models/userMoodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// new user Registration

router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }

    // hasH Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // save user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User profile created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// user login

router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    // compare password

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // create and assign token

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "5d",
    });

    //send response
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get current user

router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;