const { createDB } = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("../models/userModel");

const Order = createDB.define("ordersDB", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  productID: DataTypes.INTEGER,
  userID: DataTypes.INTEGER,
});

Order.belongsTo(User, { foreignKey: "userID" });
User.hasMany(Order, { foreignKey: "id" });

module.exports = Order;
