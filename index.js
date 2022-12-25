const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const PORT = 9785;

//middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log("app live on http://localhost:" + PORT);
  connectDB();
});
