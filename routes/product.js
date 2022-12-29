const express = require("express");
const router = express.Router();
const { isAuthorized, isSeller, isBuyer } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// !Learn payment Integration from stripe documentation
// const stripe = require("stripe")(
//   "pk_test_51MK2DsSFhFZeXdgPOiS35YLyEAMcg9KhgWkl6dkUCBUiJymdWnJ5o90HOI7zJegqPErnWHeFdJyvoEGE7EbCI37J00qnALbrcA"
// );
const { WebhookClient } = require("discord.js");

const webHook = new WebhookClient({
  url: "https://canary.discord.com/api/webhooks/1057892123912970281/QIhr32Dyjjf8UxSxAD9p6l4pHMOelToXOMhQ67eDJbIeywafhFbFwJPgPf_qbjILzlmp",
});

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

router.get("/get/all", isAuthorized, async (req, res) => {
  try {
    const products = await Product.findAll();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.post("/buy/:productID", isAuthorized, isBuyer, async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productID },
    });

    if (!product) {
      return res.status(404).json({
        err: "Product not found",
      });
    }

    const OrderDetails = {
      productID: req.params.productID,
      userID: req.user.id,
    };
    // !Learn payment Integration from stripe documentation

    // let paymentMethod = await stripe.paymentMethod.create({
    //   type: "card",
    //   card: {
    //     number: 1212121212121212,
    //     exp_month: 12,
    //     exp_year: 2025,
    //     cvc: 343,
    //   },
    // });

    // let paymentIntent = await stripe.paymentIntent.create({
    //   amount: 1000,
    //   currency: inr,
    //   payment_method_types: ["card"],
    //   payment_method: paymentMethod.id,
    //   confirm: true,
    // });

    // const OrderDB = await Order.create(OrderDetails);
    // !Learn payment Integration from stripe documentation

    webHook.send({
      content: `Yo bro order kiya tha kya ye le teri order Id: 1`,
      username: "skysparko",
      avatarURL:
        "https://yt3.ggpht.com/ytc/AMLnZu-lmgvxP6ffStNNipFQIKxPGxPC0kkTB1IqUtr-lg=s900-c-k-c0x00ffffff-no-rj",
    });

    return res.status(200).json({
      // OrderDB,
      msg: "OrderCompleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: error,
    });
  }
});

module.exports = router;
