// const router = require("express").Router();
// const User = require("../models/User");
// const cryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
// Register

import express from "express";
import User from "../models/User.js";
import cryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    console.log(newUser);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("User not found");

    const hash = cryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const Orginalpassword = hash.toString(cryptoJS.enc.Utf8);
    Orginalpassword !== req.body.password &&
      res.status(401).json("Wrong Password");
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT,
      { expiresIn: "3d" }
    );
    const { password, ...data } = user._doc;
    Orginalpassword === req.body.password &&
      res.status(200).json({ ...data, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// module.exports = router;
export default router;
