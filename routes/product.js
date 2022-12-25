const express = require("express");
const router = express.Router();
const { isAuthorized, isSeller } = require("../middlewares/auth");

router.post("/create", isAuthorized, isSeller, (req, res) => {
  console.log("product is created");
});

module.exports = router;
