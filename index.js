const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");
const authRoute = require("./routes/auth");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected"))
  .catch((e) => console.log("Error", e));

app.use(cors());
app.use(express.json());
app.use(helemt());
app.use(compression());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
