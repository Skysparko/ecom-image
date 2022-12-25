const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthorized = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(404).json({
      err: "token not found",
    });
  }

  const decodedToken = jwt.verify(token, "secret Message");

  const user = await User.findOne({
    where: {
      id: decodedToken.user.id,
    },
  });

  if (!user) {
    return res.status(404).json({
      err: "user not found",
    });
  }

  req.user = user;
  next();
};

const isSeller = (req, res, next) => {
  if (req.user.isSeller) {
    next();
  } else {
    return res.status(401).json({
      err: "You are not seller",
    });
  }
};

module.exports = { isAuthorized, isSeller };
