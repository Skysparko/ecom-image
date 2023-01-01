require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const swaggerUI = require("swagger-ui-express");
const swaggerJSdoc = require("swagger-jsdoc");

//middlewares
app.use(express.json());
app.use(express.static("content"));
app.use(express.urlencoded({ extended: false }));

const specs = swaggerJSdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sparking Photo Store",
      version: "1.0.0",
      description: "you can buy and sell photos here",
    },
    servers: [
      {
        url: process.env.API,
      },
    ],
  },
  apis: ["./routes/*.js"],
});

//routes
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

app.listen(process.env.PORT, () => {
  console.log("app live on ", process.env.API);
  connectDB();
});
