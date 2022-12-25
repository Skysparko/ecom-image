const express = require("express");
const router = express.Router();
const { isAuthorized, isSeller } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");
const Product = require("../models/productModel");

router.post("/create", isAuthorized, isSeller, (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        console.log(">>>>>>", err);
        return res.status(500).json({
          err,
        });
      }
      const { name, price } = req.body;

      if (!name || !price || !req.file) {
        return res.status(400).json({
          err: "please provide name,price and img",
        });
      }

      if (Number.isNaN(price)) {
        return res.status(400).json({
          err: "please enter price in number",
        });
      }

      let productData = {
        name,
        price,
        content: req.file.path,
      };

      const createdProduct = await Product.create(productData);

      return res.status(201).json({
        message: "product sucessfully created",
        createdProduct,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  });
});

module.exports = router;
