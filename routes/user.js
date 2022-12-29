const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, isSeller } = await req.body;
    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(403).send("User Already exists");
    }

    if (!validateName(name)) {
      return res.status(400).send("Name validation failed");
    }
    if (!validateEmail(email)) {
      return res.status(400).send("Email validation failed");
    }
    if (!validatePassword(password)) {
      return res.status(400).send("Password validation failed");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      isSeller,
    };

    const createdUser = await User.create(userData);

    return res.status(201).json({ createdUser });
  } catch (error) {
    console.log(">>>>", error);
    return res.status(500).send(error);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = await req.body;
  if (email.length === 0) {
    return res.status(400).send("please provide email");
  }
  if (password.length === 0) {
    return res.status(400).send("please provide password");
  }

  const existingUser = await User.findOne({
    where: { email },
  });
  if (!existingUser) {
    return res.status(404).send("User not Found");
  }
  const passMatch = await bcrypt.compare(password, existingUser.password);
  if (!passMatch) {
    return res.status(400).send("email or password is invalid");
  }

  const payload = { user: { id: existingUser.id } };
  const bearerToken = jwt.sign(payload, "secret Message", {
    expiresIn: 360000,
  });

  res.cookie = ("t", bearerToken, { expire: new Date() + 36000 });

  return res.status(200).json({
    bearerToken,
    isSeller: existingUser.isSeller,
  });
});

router.post("/signout", async (req, res) => {
  try {
    res.clearCookie("t");
    return res.status(200).json({
      message: "Sign out Completed",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
