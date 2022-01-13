const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const cryptoJS = require("crypto-js");
const Order = require("../models/Order");

const router = require("express").Router();
// import express from "express";
// import Cart from "../models/Cart.js";
// const router = express.Router();

// Create

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const cart = await newCart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.id });
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get User Cart

router.get("/find/:userid", async (req, res) => {
  try {
    const product = await Cart.findOne({ userId: req.params.userid });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL USER CART

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
// export default router;
