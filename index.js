const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import compression from "compression";
// import cors from "cors";
// import userRoute from "./routes/user.js";
// import productRoute from "./routes/product.js";
// import cartRoute from "./routes/Cart.js";
// import orderRoute from "./routes/Order.js";
// import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected"))
  .catch((e) => console.log("Error", e));

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
