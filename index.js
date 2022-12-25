const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const PORT = 9785;
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

//middlewares
app.use(express.json());
app.use(express.static("content"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

app.listen(PORT, () => {
  console.log("app live on http://localhost:" + PORT);
  connectDB();
});
